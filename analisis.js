// Horarios programados de inicio con tolerancia de 20 minutos
const horariosRutas = {
    "700 | VALLARTA ADMIN": "05:47",
    "17 | REAL DE COLIMA 1": "05:55",
    "700 | SANTA MARGARITA": "05:40",
    "37 | AVIACION": "06:40",
    "36 | CHAPALA": "07:20",
    "703 | CAMINO R. COLIMA ADMIN": "06:45",
    "31 | SAN ISIDRO": "07:00",
    "19 | LOMA DORADA": "07:20",
    "22 | LAZARO CARDENAS": "07:20",
    "LAS AGUILAS": "07:20",
    "38 | PROLONG. M. OTERO": "07:25",
    "35 | PROVIDENCIA": "07:15",
    "68 | EL SALTO": "07:30",
    "33 | ANGEL LEAÑO": "06:45",
    "40 | 8 DE JULIO": "07:00",
    "21 | OBLATOS": "07:20",
    "24 | TRANSITO": "07:15",
    "28 | PATRIA": "07:20"
};

const TOLERANCIA_MINUTOS = 20;

// Variables globales
let historico = {};
let chartRetardos, chartPoblacion, chartDuracion;
let filtros = {
    periodo: 'mes',
    fechaInicio: null,
    fechaFin: null,
    ruta: 'todas'
};

// Cargar datos al iniciar
window.addEventListener('DOMContentLoaded', () => {
    cargarHistorico();
    inicializarFiltros();
    aplicarFiltrosYActualizar();
    
    // Event listeners
    document.getElementById('aplicarFiltros').addEventListener('click', aplicarFiltrosYActualizar);
    document.getElementById('periodoFiltro').addEventListener('change', toggleFechasPersonalizadas);
    document.getElementById('vistaRetardos').addEventListener('change', actualizarGraficaRetardos);
    document.getElementById('vistaPoblacion').addEventListener('change', actualizarGraficaPoblacion);
    document.getElementById('vistaDuracion').addEventListener('change', actualizarGraficaDuracion);
    document.getElementById('exportarAnalisis').addEventListener('click', exportarAnalisisCompleto);
});

// Cargar histórico desde localStorage
function cargarHistorico() {
    const historicoGuardado = localStorage.getItem('historicoRutas');
    if (historicoGuardado) {
        historico = JSON.parse(historicoGuardado);
    } else {
        alert('No hay datos históricos disponibles. Por favor, registra datos primero en la página principal.');
    }
}

// Inicializar filtros
function inicializarFiltros() {
    // Llenar selector de rutas
    const rutaFiltro = document.getElementById('rutaFiltro');
    Object.keys(horariosRutas).forEach(ruta => {
        const option = document.createElement('option');
        option.value = ruta;
        option.textContent = ruta;
        rutaFiltro.appendChild(option);
    });
    
    // Establecer fechas por defecto
    const hoy = new Date();
    document.getElementById('fechaFinFiltro').value = hoy.toISOString().split('T')[0];
    
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    document.getElementById('fechaInicioFiltro').value = inicioMes.toISOString().split('T')[0];
}

// Toggle fechas personalizadas
function toggleFechasPersonalizadas() {
    const periodo = document.getElementById('periodoFiltro').value;
    const personalizadas = document.getElementById('fechasPersonalizadas');
    const personalizadas2 = document.getElementById('fechasPersonalizadas2');
    
    if (periodo === 'personalizado') {
        personalizadas.style.display = 'block';
        personalizadas2.style.display = 'block';
    } else {
        personalizadas.style.display = 'none';
        personalizadas2.style.display = 'none';
    }
}

// Aplicar filtros y actualizar todo
function aplicarFiltrosYActualizar() {
    // Obtener valores de filtros
    const periodo = document.getElementById('periodoFiltro').value;
    const ruta = document.getElementById('rutaFiltro').value;
    
    // Calcular rango de fechas según período
    const hoy = new Date();
    let fechaInicio, fechaFin;
    
    switch(periodo) {
        case 'semana':
            fechaInicio = new Date(hoy);
            fechaInicio.setDate(hoy.getDate() - 7);
            fechaFin = hoy;
            break;
        case 'mes':
            fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
            fechaFin = hoy;
            break;
        case 'año':
            fechaInicio = new Date(hoy.getFullYear(), 0, 1);
            fechaFin = hoy;
            break;
        case 'personalizado':
            fechaInicio = new Date(document.getElementById('fechaInicioFiltro').value);
            fechaFin = new Date(document.getElementById('fechaFinFiltro').value);
            break;
    }
    
    filtros = {
        periodo,
        fechaInicio: fechaInicio.toISOString().split('T')[0],
        fechaFin: fechaFin.toISOString().split('T')[0],
        ruta
    };
    
    // Actualizar todo
    actualizarTarjetasResumen();
    actualizarGraficaRetardos();
    actualizarGraficaPoblacion();
    actualizarGraficaDuracion();
    actualizarTablaDetalles();
}

// Función para verificar si un viaje tiene retardo
function tieneRetardo(horaInicio, rutaEntrada) {
    if (!horaInicio || !rutaEntrada || !horariosRutas[rutaEntrada]) return false;
    
    const horaProgramada = horariosRutas[rutaEntrada];
    const [horaProg, minProg] = horaProgramada.split(':').map(Number);
    const [horaReal, minReal] = horaInicio.split(':').map(Number);
    
    const minutosProgramados = horaProg * 60 + minProg;
    const minutosReales = horaReal * 60 + minReal;
    
    const diferencia = minutosReales - minutosProgramados;
    
    return diferencia > TOLERANCIA_MINUTOS;
}

// Función para calcular duración del viaje en minutos
function calcularDuracion(horaInicio, horaLlegada) {
    if (!horaInicio || !horaLlegada) return 0;
    
    const [horaIni, minIni] = horaInicio.split(':').map(Number);
    const [horaLleg, minLleg] = horaLlegada.split(':').map(Number);
    
    const minutosInicio = horaIni * 60 + minIni;
    const minutosLlegada = horaLleg * 60 + minLleg;
    
    return minutosLlegada - minutosInicio;
}

// Filtrar datos según filtros activos
function obtenerDatosFiltrados() {
    const datosFiltrados = [];
    
    Object.keys(historico).forEach(fecha => {
        if (fecha >= filtros.fechaInicio && fecha <= filtros.fechaFin) {
            historico[fecha].forEach(registro => {
                if (filtros.ruta === 'todas' || registro.rutaEntrada === filtros.ruta) {
                    datosFiltrados.push({
                        ...registro,
                        fecha
                    });
                }
            });
        }
    });
    
    return datosFiltrados;
}

// Actualizar tarjetas de resumen
function actualizarTarjetasResumen() {
    const datos = obtenerDatosFiltrados();
    
    const totalViajes = datos.length;
    let totalRetardos = 0;
    let totalPasajeros = 0;
    
    datos.forEach(registro => {
        if (tieneRetardo(registro.horaInicio, registro.rutaEntrada)) {
            totalRetardos++;
        }
        totalPasajeros += parseInt(registro.poblacionEntrada) || 0;
        totalPasajeros += parseInt(registro.poblacionSalida) || 0;
    });
    
    const porcentajePuntualidad = totalViajes > 0 
        ? Math.round(((totalViajes - totalRetardos) / totalViajes) * 100) 
        : 0;
    
    document.getElementById('totalViajes').textContent = totalViajes;
    document.getElementById('totalRetardos').textContent = totalRetardos;
    document.getElementById('porcentajePuntualidad').textContent = porcentajePuntualidad + '%';
    document.getElementById('totalPasajeros').textContent = totalPasajeros;
}

// Actualizar gráfica de retardos
function actualizarGraficaRetardos() {
    const datos = obtenerDatosFiltrados();
    const vista = document.getElementById('vistaRetardos').value;
    
    // Agrupar por ruta
    const datosPorRuta = {};
    
    datos.forEach(registro => {
        const ruta = registro.rutaEntrada;
        if (!datosPorRuta[ruta]) {
            datosPorRuta[ruta] = { total: 0, retardos: 0 };
        }
        datosPorRuta[ruta].total++;
        if (tieneRetardo(registro.horaInicio, ruta)) {
            datosPorRuta[ruta].retardos++;
        }
    });
    
    const labels = Object.keys(datosPorRuta).sort();
    const valores = labels.map(ruta => {
        if (vista === 'cantidad') {
            return datosPorRuta[ruta].retardos;
        } else {
            return datosPorRuta[ruta].total > 0 
                ? Math.round((datosPorRuta[ruta].retardos / datosPorRuta[ruta].total) * 100)
                : 0;
        }
    });
    
    const ctx = document.getElementById('chartRetardos');
    
    if (chartRetardos) {
        chartRetardos.destroy();
    }
    
    chartRetardos = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: vista === 'cantidad' ? 'Cantidad de Retardos' : 'Porcentaje de Retardos (%)',
                data: valores,
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const ruta = context.label;
                            const info = datosPorRuta[ruta];
                            if (vista === 'cantidad') {
                                return `Retardos: ${context.parsed.y} de ${info.total} viajes`;
                            } else {
                                return `${context.parsed.y}% de retardos (${info.retardos}/${info.total})`;
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: vista === 'cantidad' ? 'Cantidad' : 'Porcentaje (%)'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
    
    // Actualizar info
    const totalRetardos = valores.reduce((a, b) => a + (vista === 'cantidad' ? b : 0), 0);
    document.getElementById('infoRetardos').innerHTML = 
        `<strong>Total de retardos en el período:</strong> ${totalRetardos}`;
}

// Actualizar gráfica de población
function actualizarGraficaPoblacion() {
    const datos = obtenerDatosFiltrados();
    const vista = document.getElementById('vistaPoblacion').value;
    
    // Agrupar por ruta
    const datosPorRuta = {};
    
    datos.forEach(registro => {
        const ruta = registro.rutaEntrada;
        if (!datosPorRuta[ruta]) {
            datosPorRuta[ruta] = { total: 0, viajes: 0 };
        }
        datosPorRuta[ruta].total += parseInt(registro.poblacionEntrada) || 0;
        datosPorRuta[ruta].viajes++;
    });
    
    const labels = Object.keys(datosPorRuta).sort();
    const valores = labels.map(ruta => {
        if (vista === 'total') {
            return datosPorRuta[ruta].total;
        } else {
            return datosPorRuta[ruta].viajes > 0 
                ? Math.round(datosPorRuta[ruta].total / datosPorRuta[ruta].viajes)
                : 0;
        }
    });
    
    const ctx = document.getElementById('chartPoblacion');
    
    if (chartPoblacion) {
        chartPoblacion.destroy();
    }
    
    chartPoblacion = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: vista === 'total' ? 'Total de Pasajeros' : 'Promedio de Pasajeros por Viaje',
                data: valores,
                backgroundColor: 'rgba(139, 92, 246, 0.7)',
                borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Pasajeros'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
    
    // Actualizar info
    const totalPasajeros = labels.reduce((sum, ruta) => sum + datosPorRuta[ruta].total, 0);
    document.getElementById('infoPoblacion').innerHTML = 
        `<strong>Total de pasajeros transportados:</strong> ${totalPasajeros}`;
}

// Actualizar gráfica de duración
function actualizarGraficaDuracion() {
    const datos = obtenerDatosFiltrados();
    const vista = document.getElementById('vistaDuracion').value;
    
    // Agrupar por ruta
    const datosPorRuta = {};
    
    datos.forEach(registro => {
        const ruta = registro.rutaEntrada;
        const duracion = calcularDuracion(registro.horaInicio, registro.horaLlegada);
        
        if (duracion > 0) {
            if (!datosPorRuta[ruta]) {
                datosPorRuta[ruta] = { duraciones: [] };
            }
            datosPorRuta[ruta].duraciones.push(duracion);
        }
    });
    
    const labels = Object.keys(datosPorRuta).sort();
    
    const ctx = document.getElementById('chartDuracion');
    
    if (chartDuracion) {
        chartDuracion.destroy();
    }
    
    if (vista === 'promedio') {
        const valores = labels.map(ruta => {
            const duraciones = datosPorRuta[ruta].duraciones;
            const promedio = duraciones.reduce((a, b) => a + b, 0) / duraciones.length;
            return Math.round(promedio);
        });
        
        chartDuracion = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Duración Promedio (minutos)',
                    data: valores,
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Minutos'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
        
        // Calcular promedio general
        const todasDuraciones = labels.flatMap(ruta => datosPorRuta[ruta].duraciones);
        const promedioGeneral = Math.round(todasDuraciones.reduce((a, b) => a + b, 0) / todasDuraciones.length);
        
        document.getElementById('infoDuracion').innerHTML = 
            `<strong>Duración promedio general:</strong> ${promedioGeneral} minutos`;
    } else {
        const valoresMin = labels.map(ruta => Math.min(...datosPorRuta[ruta].duraciones));
        const valoresMax = labels.map(ruta => Math.max(...datosPorRuta[ruta].duraciones));
        
        chartDuracion = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Duración Mínima (minutos)',
                        data: valoresMin,
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderColor: 'rgba(16, 185, 129, 1)',
                        borderWidth: 2
                    },
                    {
                        label: 'Duración Máxima (minutos)',
                        data: valoresMax,
                        backgroundColor: 'rgba(245, 158, 11, 0.7)',
                        borderColor: 'rgba(245, 158, 11, 1)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Minutos'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
        
        document.getElementById('infoDuracion').innerHTML = 
            `<strong>Rango de duraciones:</strong> Mínimo y máximo por ruta`;
    }
}

// Actualizar tabla de detalles
function actualizarTablaDetalles() {
    const datos = obtenerDatosFiltrados();
    const tbody = document.getElementById('tablaDetallesBody');
    tbody.innerHTML = '';
    
    // Agrupar por ruta
    const datosPorRuta = {};
    
    datos.forEach(registro => {
        const ruta = registro.rutaEntrada;
        if (!datosPorRuta[ruta]) {
            datosPorRuta[ruta] = {
                totalViajes: 0,
                retardos: 0,
                totalPasajeros: 0,
                duraciones: []
            };
        }
        
        datosPorRuta[ruta].totalViajes++;
        if (tieneRetardo(registro.horaInicio, ruta)) {
            datosPorRuta[ruta].retardos++;
        }
        datosPorRuta[ruta].totalPasajeros += parseInt(registro.poblacionEntrada) || 0;
        
        const duracion = calcularDuracion(registro.horaInicio, registro.horaLlegada);
        if (duracion > 0) {
            datosPorRuta[ruta].duraciones.push(duracion);
        }
    });
    
    // Crear filas
    Object.keys(datosPorRuta).sort().forEach(ruta => {
        const info = datosPorRuta[ruta];
        const puntualidad = info.totalViajes > 0 
            ? Math.round(((info.totalViajes - info.retardos) / info.totalViajes) * 100)
            : 0;
        const promedioPasajeros = info.totalViajes > 0 
            ? Math.round(info.totalPasajeros / info.totalViajes)
            : 0;
        const promedioDuracion = info.duraciones.length > 0
            ? Math.round(info.duraciones.reduce((a, b) => a + b, 0) / info.duraciones.length)
            : 0;
        
        const row = tbody.insertRow();
        row.innerHTML = `
            <td style="text-align: left; font-weight: 600;">${ruta}</td>
            <td>${info.totalViajes}</td>
            <td>${info.retardos}</td>
            <td><span class="status-badge ${puntualidad >= 80 ? 'status-puntual' : 'status-retardo'}">${puntualidad}%</span></td>
            <td>${info.totalPasajeros}</td>
            <td>${promedioPasajeros}</td>
            <td>${promedioDuracion} min</td>
        `;
    });
}

// Exportar análisis completo a Excel
function exportarAnalisisCompleto() {
    const datos = obtenerDatosFiltrados();
    
    if (datos.length === 0) {
        alert('No hay datos para exportar con los filtros seleccionados.');
        return;
    }
    
    // Crear libro de Excel
    const wb = XLSX.utils.book_new();
    
    // Hoja 1: Resumen General
    const resumen = [
        ['ANÁLISIS DE RUTAS - RESUMEN GENERAL'],
        ['Período:', `${filtros.fechaInicio} a ${filtros.fechaFin}`],
        ['Ruta:', filtros.ruta === 'todas' ? 'Todas las Rutas' : filtros.ruta],
        [],
        ['Métrica', 'Valor'],
        ['Total de Viajes', datos.length],
        ['Total de Retardos', datos.filter(r => tieneRetardo(r.horaInicio, r.rutaEntrada)).length],
        ['Porcentaje de Puntualidad', document.getElementById('porcentajePuntualidad').textContent],
        ['Total de Pasajeros', document.getElementById('totalPasajeros').textContent]
    ];
    
    const wsResumen = XLSX.utils.aoa_to_sheet(resumen);
    XLSX.utils.book_append_sheet(wb, wsResumen, 'Resumen');
    
    // Hoja 2: Detalles por Ruta
    const tbody = document.getElementById('tablaDetallesBody');
    const detalles = [
        ['DETALLES POR RUTA'],
        [],
        ['Ruta', 'Total Viajes', 'Retardos', '% Puntualidad', 'Total Pasajeros', 'Promedio Pasajeros', 'Duración Promedio']
    ];
    
    Array.from(tbody.rows).forEach(row => {
        const rowData = Array.from(row.cells).map(cell => cell.textContent.trim());
        detalles.push(rowData);
    });
    
    const wsDetalles = XLSX.utils.aoa_to_sheet(detalles);
    XLSX.utils.book_append_sheet(wb, wsDetalles, 'Detalles por Ruta');
    
    // Hoja 3: Datos Completos
    const datosCompletos = [
        ['DATOS COMPLETOS'],
        [],
        ['Fecha', 'Ruta', 'Hora Inicio', 'Hora Llegada', 'Población', 'Unidad', 'Duración (min)', 'Retardo']
    ];
    
    datos.forEach(registro => {
        const duracion = calcularDuracion(registro.horaInicio, registro.horaLlegada);
        const retardo = tieneRetardo(registro.horaInicio, registro.rutaEntrada) ? 'Sí' : 'No';
        
        datosCompletos.push([
            registro.fecha,
            registro.rutaEntrada,
            registro.horaInicio,
            registro.horaLlegada,
            registro.poblacionEntrada,
            registro.unidadEntrada,
            duracion,
            retardo
        ]);
    });
    
    const wsDatos = XLSX.utils.aoa_to_sheet(datosCompletos);
    XLSX.utils.book_append_sheet(wb, wsDatos, 'Datos Completos');
    
    // Descargar archivo
    const nombreArchivo = `Analisis_Rutas_${filtros.fechaInicio}_a_${filtros.fechaFin}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
    
    alert(`✅ Análisis exportado exitosamente: ${nombreArchivo}`);
}


