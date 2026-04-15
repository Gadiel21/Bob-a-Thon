// Lista de rutas disponibles
const rutas = [
    "40 | 8 DE JULIO",
    "33 | ANGEL LEAÑO",
    "37 | AVIACION",
    "36 | CHAPALA",
    "LAS AGUILAS",
    "68 | EL SALTO",
    "22 | LAZARO CARDENAS",
    "19 | LOMA DORADA",
    "21 | OBLATOS",
    "28 | PATRIA",
    "38 | PROLONG. M. OTERO",
    "35 | PROVIDENCIA",
    "17 | REAL DE COLIMA 1",
    "31 | SAN ISIDRO",
    "24 | TRANSITO",
    "703 | COLIMA ADMIN",
    "700 | SANTA MARGARITA",
    "700 | VALLARTA ADMIN"
];

// Array para almacenar los datos de la fecha actual
let registros = [];

// Objeto para almacenar todo el histórico por fecha
let historico = {};

// Cargar datos del localStorage al iniciar
window.addEventListener('DOMContentLoaded', () => {
    cargarHistorico();
    cargarDatos();
    actualizarEstadisticas();
    
    // Event listeners
    document.getElementById('addRowBtn').addEventListener('click', agregarFila);
    document.getElementById('exportBtn').addEventListener('click', exportarAExcel);
    document.getElementById('exportRangeBtn').addEventListener('click', abrirModalRango);
    document.getElementById('exportAllBtn').addEventListener('click', exportarHistoricoCompleto);
    document.getElementById('fecha').addEventListener('change', cambiarFecha);
    
    // Event listeners del modal
    document.querySelector('.close').addEventListener('click', cerrarModalRango);
    document.getElementById('cancelRangeBtn').addEventListener('click', cerrarModalRango);
    document.getElementById('confirmRangeBtn').addEventListener('click', exportarRangoFechas);
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('rangeModal');
        if (event.target === modal) {
            cerrarModalRango();
        }
    });
    
    // Actualizar info del rango cuando cambian las fechas
    document.getElementById('fechaInicio').addEventListener('change', actualizarInfoRango);
    document.getElementById('fechaFin').addEventListener('change', actualizarInfoRango);
});

// Función para crear opciones de select para rutas
function crearOpcionesRutas() {
    let options = '<option value="">Seleccionar...</option>';
    rutas.forEach(ruta => {
        options += `<option value="${ruta}">${ruta}</option>`;
    });
    return options;
}

// Función para agregar una nueva fila
function agregarFila() {
    const tableBody = document.getElementById('tableBody');
    const rowId = Date.now(); // ID único basado en timestamp
    
    const row = document.createElement('tr');
    row.dataset.id = rowId;
    row.innerHTML = `
        <td><input type="time" class="hora-inicio" onchange="guardarDatos()"></td>
        <td><input type="time" class="hora-llegada" onchange="guardarDatos()"></td>
        <td><input type="number" class="poblacion-entrada" min="1" max="37" placeholder="1-37" onchange="guardarDatos()"></td>
        <td>
            <select class="ruta-entrada" onchange="guardarDatos()">
                ${crearOpcionesRutas()}
            </select>
        </td>
        <td><input type="text" class="unidad-entrada" placeholder="Ej: 101" onchange="guardarDatos()"></td>
        <td><input type="time" class="hora-salida" onchange="guardarDatos()"></td>
        <td><input type="number" class="poblacion-salida" min="1" max="37" placeholder="1-37" onchange="guardarDatos()"></td>
        <td>
            <select class="ruta-salida" onchange="guardarDatos()">
                ${crearOpcionesRutas()}
            </select>
        </td>
        <td><input type="text" class="unidad-salida" placeholder="Ej: 102" onchange="guardarDatos()"></td>
        <td>
            <div class="action-buttons">
                <button class="delete-btn" onclick="eliminarFila(${rowId})">🗑️ Eliminar</button>
            </div>
        </td>
    `;
    
    tableBody.appendChild(row);
    actualizarEstadisticas();
    guardarDatos();
}

// Función para eliminar una fila
function eliminarFila(rowId) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
        const row = document.querySelector(`tr[data-id="${rowId}"]`);
        if (row) {
            row.remove();
            guardarDatos();
            actualizarEstadisticas();
        }
    }
}

// Función para cargar el histórico completo
function cargarHistorico() {
    const historicoGuardado = localStorage.getItem('historicoRutas');
    if (historicoGuardado) {
        historico = JSON.parse(historicoGuardado);
    }
}

// Función para guardar datos en localStorage
function guardarDatos() {
    const fecha = document.getElementById('fecha').value;
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.querySelectorAll('tr');
    
    registros = [];
    
    rows.forEach(row => {
        const registro = {
            id: row.dataset.id,
            fecha: fecha,
            horaInicio: row.querySelector('.hora-inicio').value,
            horaLlegada: row.querySelector('.hora-llegada').value,
            poblacionEntrada: row.querySelector('.poblacion-entrada').value,
            rutaEntrada: row.querySelector('.ruta-entrada').value,
            unidadEntrada: row.querySelector('.unidad-entrada').value,
            horaSalida: row.querySelector('.hora-salida').value,
            poblacionSalida: row.querySelector('.poblacion-salida').value,
            rutaSalida: row.querySelector('.ruta-salida').value,
            unidadSalida: row.querySelector('.unidad-salida').value
        };
        registros.push(registro);
    });
    
    // Guardar en el histórico
    historico[fecha] = registros;
    localStorage.setItem('historicoRutas', JSON.stringify(historico));
    localStorage.setItem('fechaActual', fecha);
}

// Función para cambiar de fecha
function cambiarFecha() {
    guardarDatos(); // Guardar datos actuales antes de cambiar
    cargarDatos(); // Cargar datos de la nueva fecha
    actualizarEstadisticas();
}

// Función para cargar datos desde localStorage
function cargarDatos() {
    const fechaGuardada = localStorage.getItem('fechaActual');
    
    if (fechaGuardada) {
        document.getElementById('fecha').value = fechaGuardada;
    }
    
    const fecha = document.getElementById('fecha').value;
    
    // Cargar registros de la fecha seleccionada desde el histórico
    if (historico[fecha]) {
        registros = historico[fecha];
    } else {
        registros = [];
    }
    
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    
    if (registros.length > 0) {
        registros.forEach(registro => {
            const row = document.createElement('tr');
            row.dataset.id = registro.id;
            row.innerHTML = `
                <td><input type="time" class="hora-inicio" value="${registro.horaInicio}" onchange="guardarDatos()"></td>
                <td><input type="time" class="hora-llegada" value="${registro.horaLlegada}" onchange="guardarDatos()"></td>
                <td><input type="number" class="poblacion-entrada" value="${registro.poblacionEntrada}" min="1" max="37" placeholder="1-37" onchange="guardarDatos()"></td>
                <td>
                    <select class="ruta-entrada" onchange="guardarDatos()">
                        ${crearOpcionesRutas()}
                    </select>
                </td>
                <td><input type="text" class="unidad-entrada" value="${registro.unidadEntrada}" placeholder="Ej: 101" onchange="guardarDatos()"></td>
                <td><input type="time" class="hora-salida" value="${registro.horaSalida}" onchange="guardarDatos()"></td>
                <td><input type="number" class="poblacion-salida" value="${registro.poblacionSalida}" min="1" max="37" placeholder="1-37" onchange="guardarDatos()"></td>
                <td>
                    <select class="ruta-salida" onchange="guardarDatos()">
                        ${crearOpcionesRutas()}
                    </select>
                </td>
                <td><input type="text" class="unidad-salida" value="${registro.unidadSalida}" placeholder="Ej: 102" onchange="guardarDatos()"></td>
                <td>
                    <div class="action-buttons">
                        <button class="delete-btn" onclick="eliminarFila(${registro.id})">🗑️ Eliminar</button>
                    </div>
                </td>
            `;
            
            // Establecer valores de los selects
            row.querySelector('.ruta-entrada').value = registro.rutaEntrada;
            row.querySelector('.ruta-salida').value = registro.rutaSalida;
            
            tableBody.appendChild(row);
        });
    }
}

// Función para actualizar estadísticas
function actualizarEstadisticas() {
    const totalRegistros = document.getElementById('tableBody').querySelectorAll('tr').length;
    document.getElementById('totalRegistros').textContent = totalRegistros;
    
    // Contar registros de hoy
    const fechaHoy = new Date().toISOString().split('T')[0];
    const fechaSeleccionada = document.getElementById('fecha').value;
    const registrosHoy = fechaSeleccionada === fechaHoy ? totalRegistros : 0;
    document.getElementById('registrosHoy').textContent = registrosHoy;
}

// Función para exportar a Excel con formato empresarial
function exportarAExcel() {
    if (registros.length === 0) {
        alert('No hay datos para exportar. Por favor, agrega al menos un registro.');
        return;
    }
    
    const fecha = document.getElementById('fecha').value;
    
    // Crear libro de Excel
    const wb = XLSX.utils.book_new();
    
    // Preparar datos en formato de tabla plana para Power BI
    const datosTabla = [];
    
    // Agregar encabezados (una sola fila)
    datosTabla.push([
        'Fecha',
        'Hora_Inicio',
        'Hora_Llegada',
        'Poblacion_Entrada',
        'Ruta_Entrada',
        'Unidad_Entrada',
        'Hora_Salida',
        'Poblacion_Salida',
        'Ruta_Salida',
        'Unidad_Salida'
    ]);
    
    // Agregar datos
    registros.forEach(registro => {
        datosTabla.push([
            fecha,
            registro.horaInicio,
            registro.horaLlegada,
            registro.poblacionEntrada,
            registro.rutaEntrada,
            registro.unidadEntrada,
            registro.horaSalida,
            registro.poblacionSalida,
            registro.rutaSalida,
            registro.unidadSalida
        ]);
    });
    
    // Crear hoja de cálculo
    const ws = XLSX.utils.aoa_to_sheet(datosTabla);
    
    // Ajustar ancho de columnas
    ws['!cols'] = [
        { wch: 12 },  // Fecha
        { wch: 15 },  // Hora_Inicio
        { wch: 15 },  // Hora_Llegada
        { wch: 18 },  // Poblacion_Entrada
        { wch: 25 },  // Ruta_Entrada
        { wch: 15 },  // Unidad_Entrada
        { wch: 15 },  // Hora_Salida
        { wch: 18 },  // Poblacion_Salida
        { wch: 25 },  // Ruta_Salida
        { wch: 15 }   // Unidad_Salida
    ];
    
    // Aplicar formato empresarial
    const range = XLSX.utils.decode_range(ws['!ref']);
    
    // Estilo para encabezados
    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        if (!ws[cellAddress]) continue;
        
        ws[cellAddress].s = {
            font: { bold: true, sz: 11, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "1F4788" } },
            alignment: { horizontal: "center", vertical: "center" },
            border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } }
            }
        };
    }
    
    // Estilo para datos (filas alternas)
    for (let row = 1; row <= range.e.r; row++) {
        const isEven = row % 2 === 0;
        const fillColor = isEven ? "F2F2F2" : "FFFFFF";
        
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
            if (!ws[cellAddress]) continue;
            
            ws[cellAddress].s = {
                alignment: { horizontal: "center", vertical: "center" },
                fill: { fgColor: { rgb: fillColor } },
                border: {
                    top: { style: "thin", color: { rgb: "CCCCCC" } },
                    bottom: { style: "thin", color: { rgb: "CCCCCC" } },
                    left: { style: "thin", color: { rgb: "CCCCCC" } },
                    right: { style: "thin", color: { rgb: "CCCCCC" } }
                }
            };
        }
    }
    
    // Agregar hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Datos_Rutas');
    
    // Generar nombre de archivo
    const nombreArchivo = `Rutas_${fecha.replace(/-/g, '_')}.xlsx`;
    
    // Descargar archivo
    XLSX.writeFile(wb, nombreArchivo);
    
    // Mostrar mensaje de éxito
    alert(`✅ Archivo exportado exitosamente: ${nombreArchivo}\n\nTotal de registros: ${registros.length}\n\n✓ Formato optimizado para Power BI`);
}

// Función para exportar todo el histórico con formato empresarial
function exportarHistoricoCompleto() {
    if (Object.keys(historico).length === 0) {
        alert('No hay datos históricos para exportar.');
        return;
    }
    
    // Crear libro de Excel
    const wb = XLSX.utils.book_new();
    
    // Preparar datos en formato de tabla plana
    const datosTabla = [];
    
    // Agregar encabezados (una sola fila)
    datosTabla.push([
        'Fecha',
        'Hora_Inicio',
        'Hora_Llegada',
        'Poblacion_Entrada',
        'Ruta_Entrada',
        'Unidad_Entrada',
        'Hora_Salida',
        'Poblacion_Salida',
        'Ruta_Salida',
        'Unidad_Salida'
    ]);
    
    let totalRegistros = 0;
    
    // Ordenar fechas
    const fechasOrdenadas = Object.keys(historico).sort();
    
    // Agregar datos de cada fecha
    fechasOrdenadas.forEach(fecha => {
        const registrosFecha = historico[fecha];
        registrosFecha.forEach(registro => {
            datosTabla.push([
                fecha,
                registro.horaInicio,
                registro.horaLlegada,
                registro.poblacionEntrada,
                registro.rutaEntrada,
                registro.unidadEntrada,
                registro.horaSalida,
                registro.poblacionSalida,
                registro.rutaSalida,
                registro.unidadSalida
            ]);
            totalRegistros++;
        });
    });
    
    // Crear hoja de cálculo
    const ws = XLSX.utils.aoa_to_sheet(datosTabla);
    
    // Ajustar ancho de columnas
    ws['!cols'] = [
        { wch: 12 },  // Fecha
        { wch: 15 },  // Hora_Inicio
        { wch: 15 },  // Hora_Llegada
        { wch: 18 },  // Poblacion_Entrada
        { wch: 25 },  // Ruta_Entrada
        { wch: 15 },  // Unidad_Entrada
        { wch: 15 },  // Hora_Salida
        { wch: 18 },  // Poblacion_Salida
        { wch: 25 },  // Ruta_Salida
        { wch: 15 }   // Unidad_Salida
    ];
    
    // Aplicar formato empresarial
    const range = XLSX.utils.decode_range(ws['!ref']);
    
    // Estilo para encabezados
    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        if (!ws[cellAddress]) continue;
        
        ws[cellAddress].s = {
            font: { bold: true, sz: 11, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "1F4788" } },
            alignment: { horizontal: "center", vertical: "center" },
            border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } }
            }
        };
    }
    
    // Estilo para datos (filas alternas)
    for (let row = 1; row <= range.e.r; row++) {
        const isEven = row % 2 === 0;
        const fillColor = isEven ? "F2F2F2" : "FFFFFF";
        
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
            if (!ws[cellAddress]) continue;
            
            ws[cellAddress].s = {
                alignment: { horizontal: "center", vertical: "center" },
                fill: { fgColor: { rgb: fillColor } },
                border: {
                    top: { style: "thin", color: { rgb: "CCCCCC" } },
                    bottom: { style: "thin", color: { rgb: "CCCCCC" } },
                    left: { style: "thin", color: { rgb: "CCCCCC" } },
                    right: { style: "thin", color: { rgb: "CCCCCC" } }
                }
            };
        }
    }
    
    // Agregar hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Historico_Rutas');
    
    // Generar nombre de archivo
    const nombreArchivo = `Rutas_Historico_Completo_${new Date().toISOString().split('T')[0].replace(/-/g, '_')}.xlsx`;
    
    // Descargar archivo
    XLSX.writeFile(wb, nombreArchivo);
    
    // Mostrar mensaje de éxito
    alert(`✅ Histórico exportado exitosamente: ${nombreArchivo}\n\nTotal de fechas: ${fechasOrdenadas.length}\nTotal de registros: ${totalRegistros}\n\n✓ Formato optimizado para Power BI\n✓ Listo para importar directamente`);
}

// Función para abrir el modal de rango de fechas
function abrirModalRango() {
    if (Object.keys(historico).length === 0) {
        alert('No hay datos históricos disponibles.');
        return;
    }
    
    const modal = document.getElementById('rangeModal');
    const fechas = Object.keys(historico).sort();
    
    // Establecer valores por defecto
    document.getElementById('fechaInicio').value = fechas[0];
    document.getElementById('fechaFin').value = fechas[fechas.length - 1];
    
    actualizarInfoRango();
    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModalRango() {
    const modal = document.getElementById('rangeModal');
    modal.style.display = 'none';
}

// Función para actualizar la información del rango
function actualizarInfoRango() {
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const rangeInfo = document.getElementById('rangeInfo');
    
    if (!fechaInicio || !fechaFin) {
        rangeInfo.textContent = 'Selecciona las fechas para exportar';
        return;
    }
    
    if (fechaInicio > fechaFin) {
        rangeInfo.innerHTML = '⚠️ La fecha de inicio debe ser anterior a la fecha fin';
        rangeInfo.style.color = 'var(--danger-color)';
        return;
    }
    
    // Contar registros en el rango
    let totalRegistros = 0;
    let fechasEnRango = 0;
    
    Object.keys(historico).forEach(fecha => {
        if (fecha >= fechaInicio && fecha <= fechaFin) {
            totalRegistros += historico[fecha].length;
            fechasEnRango++;
        }
    });
    
    rangeInfo.innerHTML = `✓ Se exportarán <strong>${totalRegistros} registros</strong> de <strong>${fechasEnRango} fechas</strong>`;
    rangeInfo.style.color = 'var(--success-color)';
}

// Función para exportar rango de fechas
function exportarRangoFechas() {
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    
    if (!fechaInicio || !fechaFin) {
        alert('Por favor selecciona ambas fechas.');
        return;
    }
    
    if (fechaInicio > fechaFin) {
        alert('La fecha de inicio debe ser anterior o igual a la fecha fin.');
        return;
    }
    
    // Crear libro de Excel
    const wb = XLSX.utils.book_new();
    
    // Preparar datos en formato de tabla plana
    const datosTabla = [];
    
    // Agregar encabezados (una sola fila)
    datosTabla.push([
        'Fecha',
        'Hora_Inicio',
        'Hora_Llegada',
        'Poblacion_Entrada',
        'Ruta_Entrada',
        'Unidad_Entrada',
        'Hora_Salida',
        'Poblacion_Salida',
        'Ruta_Salida',
        'Unidad_Salida'
    ]);
    
    let totalRegistros = 0;
    let fechasIncluidas = 0;
    
    // Ordenar fechas y filtrar por rango
    const fechasOrdenadas = Object.keys(historico)
        .filter(fecha => fecha >= fechaInicio && fecha <= fechaFin)
        .sort();
    
    // Agregar datos de cada fecha en el rango
    fechasOrdenadas.forEach(fecha => {
        const registrosFecha = historico[fecha];
        registrosFecha.forEach(registro => {
            datosTabla.push([
                fecha,
                registro.horaInicio,
                registro.horaLlegada,
                registro.poblacionEntrada,
                registro.rutaEntrada,
                registro.unidadEntrada,
                registro.horaSalida,
                registro.poblacionSalida,
                registro.rutaSalida,
                registro.unidadSalida
            ]);
            totalRegistros++;
        });
        fechasIncluidas++;
    });
    
    if (totalRegistros === 0) {
        alert('No hay registros en el rango de fechas seleccionado.');
        return;
    }
    
    // Crear hoja de cálculo
    const ws = XLSX.utils.aoa_to_sheet(datosTabla);
    
    // Ajustar ancho de columnas
    ws['!cols'] = [
        { wch: 12 },  // Fecha
        { wch: 15 },  // Hora_Inicio
        { wch: 15 },  // Hora_Llegada
        { wch: 18 },  // Poblacion_Entrada
        { wch: 25 },  // Ruta_Entrada
        { wch: 15 },  // Unidad_Entrada
        { wch: 15 },  // Hora_Salida
        { wch: 18 },  // Poblacion_Salida
        { wch: 25 },  // Ruta_Salida
        { wch: 15 }   // Unidad_Salida
    ];
    
    // Aplicar formato empresarial
    const range = XLSX.utils.decode_range(ws['!ref']);
    
    // Estilo para encabezados
    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        if (!ws[cellAddress]) continue;
        
        ws[cellAddress].s = {
            font: { bold: true, sz: 11, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "1F4788" } },
            alignment: { horizontal: "center", vertical: "center" },
            border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } }
            }
        };
    }
    
    // Estilo para datos (filas alternas)
    for (let row = 1; row <= range.e.r; row++) {
        const isEven = row % 2 === 0;
        const fillColor = isEven ? "F2F2F2" : "FFFFFF";
        
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
            if (!ws[cellAddress]) continue;
            
            ws[cellAddress].s = {
                alignment: { horizontal: "center", vertical: "center" },
                fill: { fgColor: { rgb: fillColor } },
                border: {
                    top: { style: "thin", color: { rgb: "CCCCCC" } },
                    bottom: { style: "thin", color: { rgb: "CCCCCC" } },
                    left: { style: "thin", color: { rgb: "CCCCCC" } },
                    right: { style: "thin", color: { rgb: "CCCCCC" } }
                }
            };
        }
    }
    
    // Agregar hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Rango_Rutas');
    
    // Generar nombre de archivo
    const nombreArchivo = `Rutas_${fechaInicio.replace(/-/g, '_')}_a_${fechaFin.replace(/-/g, '_')}.xlsx`;
    
    // Descargar archivo
    XLSX.writeFile(wb, nombreArchivo);
    
    // Cerrar modal
    cerrarModalRango();
    
    // Mostrar mensaje de éxito
    alert(`✅ Rango exportado exitosamente: ${nombreArchivo}\n\nPeríodo: ${fechaInicio} a ${fechaFin}\nTotal de fechas: ${fechasIncluidas}\nTotal de registros: ${totalRegistros}\n\n✓ Formato optimizado para Power BI`);
}

// Agregar algunas filas de ejemplo al cargar por primera vez
if (!localStorage.getItem('historicoRutas')) {
    // Agregar 2 filas de ejemplo
    agregarFila();
    agregarFila();
}

// Made with Bob
