# 📊 Guía del Dashboard de Análisis

## 🎯 Descripción

El Dashboard de Análisis es una herramienta visual interactiva que te permite analizar el desempeño de las rutas de transporte con gráficas dinámicas y métricas clave.

## 🚀 Acceso al Dashboard

1. Desde la página principal, haz clic en el botón **"📊 Ver Dashboard de Análisis"**
2. O accede directamente a: `analisis.html`

## 📋 Características Principales

### 1️⃣ Filtros de Análisis

**Período:**
- **Esta Semana**: Últimos 7 días
- **Este Mes**: Mes actual completo
- **Este Año**: Año actual completo
- **Personalizado**: Selecciona fechas específicas

**Ruta:**
- Selecciona una ruta específica o "Todas las Rutas"

**Aplicar Filtros:**
- Haz clic en "Aplicar Filtros" para actualizar todas las gráficas

### 2️⃣ Tarjetas de Resumen

**Total de Viajes** 🚌
- Cantidad total de viajes registrados en el período

**Viajes con Retardo** ⏰
- Cantidad de viajes que llegaron tarde (más de 20 min después de la hora programada)

**Puntualidad** ✓
- Porcentaje de viajes que llegaron a tiempo

**Total Pasajeros** 👥
- Suma total de pasajeros transportados

### 3️⃣ Gráfica de Retardos por Ruta

**Análisis de Puntualidad:**
- Muestra qué rutas tienen más retardos
- Tolerancia: 20 minutos después de la hora programada

**Vistas Disponibles:**
- **Cantidad de Retardos**: Número absoluto de retardos por ruta
- **Porcentaje de Retardos**: Porcentaje de viajes con retardo

**Horarios Programados:**
```
VALLARTA ADMIN: 5:47 AM
REAL A COLIMA: 5:55 AM
SANTA MARGARITA: 5:40 AM
AVIACION: 6:40 AM
CHAPALA: 7:20 AM
CAMINO R. COLIMA ADMIN: 6:45 AM
SAN ISIDRO: 7:00 AM
LOMA DORADA: 7:20 AM
LAZARO CARDENAS: 7:20 AM
LAS AGUILAS: 7:20 AM
MARIANO OTERO: 7:25 AM
PROVIDENCIA: 7:15 AM
EL SALTO: 7:30 AM
ANGEL LEAÑO: 6:45 AM
8 DE JULIO: 7:00 AM
OBLATOS: 7:20 AM
TRANSITO: 7:15 AM
PATRIA: 7:20 AM
```

### 4️⃣ Gráfica de Población por Ruta

**Análisis de Pasajeros:**
- Muestra cuántos pasajeros transporta cada ruta

**Vistas Disponibles:**
- **Total de Pasajeros**: Suma total de pasajeros por ruta
- **Promedio por Viaje**: Promedio de pasajeros por viaje

**Utilidad:**
- Identificar rutas más demandadas
- Planificar capacidad de unidades
- Optimizar recursos

### 5️⃣ Gráfica de Duración de Viajes

**Análisis de Tiempos:**
- Muestra cuánto tiempo tarda cada ruta

**Vistas Disponibles:**
- **Promedio**: Duración promedio por ruta
- **Mínimo y Máximo**: Rango de duraciones

**Información Adicional:**
- Promedio general de todas las rutas
- Útil para planificación de horarios

### 6️⃣ Tabla de Detalles

**Información Completa por Ruta:**
- Total de viajes
- Cantidad de retardos
- Porcentaje de puntualidad
- Total de pasajeros
- Promedio de pasajeros por viaje
- Duración promedio

**Indicadores de Color:**
- 🟢 Verde: Puntualidad ≥ 80%
- 🔴 Rojo: Puntualidad < 80%

### 7️⃣ Exportar Análisis

**Botón: "📊 Exportar Análisis Completo a Excel"**

**El archivo incluye 3 hojas:**

1. **Resumen General**
   - Período analizado
   - Ruta seleccionada
   - Métricas principales

2. **Detalles por Ruta**
   - Tabla completa con todas las métricas
   - Formato profesional

3. **Datos Completos**
   - Todos los registros individuales
   - Fecha, ruta, horarios, población, duración, retardo

## 📊 Casos de Uso

### Análisis Semanal
1. Selecciona "Esta Semana"
2. Revisa las tarjetas de resumen
3. Identifica rutas con más retardos
4. Exporta el análisis

### Análisis Mensual
1. Selecciona "Este Mes"
2. Compara población entre rutas
3. Revisa duraciones promedio
4. Toma decisiones de optimización

### Análisis por Ruta Específica
1. Selecciona la ruta en el filtro
2. Analiza su desempeño individual
3. Compara con períodos anteriores

### Análisis Personalizado
1. Selecciona "Personalizado"
2. Define fechas de inicio y fin
3. Analiza un período específico
4. Exporta para reportes

## 🎨 Interactividad

**Gráficas Interactivas:**
- Pasa el mouse sobre las barras para ver detalles
- Las gráficas se actualizan automáticamente con los filtros
- Cambia entre vistas sin recargar la página

**Filtros Dinámicos:**
- Los cambios se aplican a todas las gráficas simultáneamente
- Mantiene consistencia en todo el dashboard

## 📈 Métricas Clave

### Puntualidad
- **Excelente**: ≥ 90%
- **Buena**: 80-89%
- **Regular**: 70-79%
- **Necesita Mejora**: < 70%

### Ocupación
- **Alta**: > 30 pasajeros promedio
- **Media**: 20-30 pasajeros promedio
- **Baja**: < 20 pasajeros promedio

### Duración
- Compara con el promedio general
- Identifica rutas más lentas
- Optimiza tiempos de recorrido

## 💡 Consejos de Uso

1. **Análisis Regular**: Revisa el dashboard semanalmente
2. **Identifica Patrones**: Busca tendencias en retardos
3. **Toma Decisiones**: Usa los datos para mejorar el servicio
4. **Exporta Reportes**: Guarda análisis para comparaciones futuras
5. **Comparte Información**: Usa los reportes en reuniones

## 🔄 Actualización de Datos

- Los datos se cargan automáticamente desde el localStorage
- Registra datos en la página principal
- El dashboard se actualiza en tiempo real
- No requiere sincronización manual

## 📱 Compatibilidad

El dashboard funciona en:
- ✅ Computadoras de escritorio
- ✅ Laptops
- ✅ Tablets
- ✅ Teléfonos móviles (vista adaptada)

## 🆘 Solución de Problemas

### "No hay datos históricos disponibles"
- Registra datos primero en la página principal
- Asegúrate de tener al menos un registro guardado

### "Las gráficas no se muestran"
- Verifica tu conexión a internet (Chart.js se carga desde CDN)
- Recarga la página (F5)

### "Los filtros no funcionan"
- Haz clic en "Aplicar Filtros" después de cambiar los valores
- Verifica que las fechas sean válidas

## 📊 Ejemplo de Análisis

**Escenario: Análisis Mensual de Retardos**

1. Selecciona "Este Mes" en período
2. Observa la gráfica de retardos
3. Identifica: "Ruta 40 | 8 DE JULIO tiene 15 retardos (30%)"
4. Revisa la tabla de detalles para más información
5. Exporta el análisis
6. Toma acción: Ajustar horarios o investigar causas

## 🎯 Objetivos del Dashboard

- ✅ Visualizar datos de forma clara
- ✅ Identificar problemas rápidamente
- ✅ Tomar decisiones basadas en datos
- ✅ Mejorar la eficiencia del servicio
- ✅ Generar reportes profesionales

---

**¡El Dashboard de Análisis te ayuda a tomar mejores decisiones basadas en datos reales! 📊**
