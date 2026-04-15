# 🚌 Sistema de Gestión de Rutas de Transporte

Sistema web moderno para registrar y gestionar entradas y salidas de rutas de transporte, con capacidad de exportación a Excel para análisis en Power BI.

## 📋 Características

- ✅ Interfaz moderna con colores atractivos (gradientes morados, azules y rosas)
- ✅ Registro de entradas y salidas de unidades
- ✅ 15 rutas predefinidas
- ✅ Exportación a Excel (.xlsx)
- ✅ Almacenamiento local automático (LocalStorage)
- ✅ Estadísticas en tiempo real
- ✅ Diseño responsive (funciona en móviles y tablets)
- ✅ Animaciones suaves

## 🎨 Rutas Disponibles

1. 40 | 8 DE JULIO
2. 33 | ANGEL LEAÑO
3. 37 | AVIACION
4. 36 | CHAPALA
5. LAS AGUILAS
6. 68 | EL SALTO
7. 22 | LAZARO CARDENAS
8. 19 | LOMA DORADA
9. 21 | OBLATOS
10. 28 | PATRIA
11. 38 | PROLONG. M. OTERO
12. 35 | PROVIDENCIA
13. 17 | REAL DE COLIMA 1
14. 31 | SAN ISIDRO
15. 24 | TRANSITO

## 🚀 Cómo Usar

### Instalación

1. **Descarga el proyecto** o clona el repositorio
2. **Abre el archivo `index.html`** en tu navegador web favorito (Chrome, Firefox, Edge, etc.)
3. ¡Listo! No requiere instalación de servidor ni dependencias adicionales

### Uso Básico

1. **Seleccionar Fecha**: Usa el selector de fecha en la parte superior
2. **Agregar Registro**: Haz clic en el botón "➕ Agregar Registro"
3. **Llenar Datos**:
   - **ENTRADA**:
     - Hora Inicio: Hora en que inicia el recorrido
     - Hora Llegada: Hora en que llega a destino
     - Población: Cantidad de personas que subieron (1-37)
     - Ruta: Selecciona la ruta de la lista desplegable
     - Unidad: Número de la unidad (ej: 101)
   - **SALIDA**:
     - Hora Salida: Hora en que sale de regreso
     - Población: Cantidad de personas que bajaron (1-37)
     - Ruta: Selecciona la ruta de salida
     - Unidad: Número de unidad de salida
4. **Guardar**: Los datos se guardan automáticamente
5. **Eliminar**: Usa el botón "🗑️ Eliminar" para borrar un registro

### Exportar a Excel

El sistema ofrece **tres opciones de exportación** con **formato empresarial profesional**:

#### Opción 1: Exportar Fecha Actual
1. Haz clic en el botón "📊 Exportar Fecha Actual"
2. Se descargará un archivo con los registros de la fecha seleccionada
3. Nombre del archivo: `Rutas_YYYY_MM_DD.xlsx`

#### Opción 2: Exportar Rango de Fechas ⭐ NUEVO
1. Haz clic en el botón "📅 Exportar Rango de Fechas"
2. Se abrirá un modal elegante donde puedes:
   - Seleccionar la **Fecha Inicio**
   - Seleccionar la **Fecha Fin**
   - Ver en tiempo real cuántos registros y fechas se exportarán
3. Haz clic en "Exportar Rango"
4. Nombre del archivo: `Rutas_YYYY_MM_DD_a_YYYY_MM_DD.xlsx`
5. **Ideal para**: Reportes mensuales, trimestrales o períodos específicos

#### Opción 3: Exportar Todo el Histórico
1. Haz clic en el botón "📚 Exportar Todo el Histórico"
2. Se descargará un archivo con TODOS los registros de TODAS las fechas
3. Nombre del archivo: `Rutas_Historico_Completo_YYYY_MM_DD.xlsx`

### 📋 Formato del Excel (Optimizado para Power BI)

**Estructura de Columnas:**
```
| Fecha | Hora_Inicio | Hora_Llegada | Poblacion_Entrada | Ruta_Entrada | Unidad_Entrada | Hora_Salida | Poblacion_Salida | Ruta_Salida | Unidad_Salida |
```

**Características del Formato:**
- ✅ **Tabla Plana**: Una sola fila de encabezados
- ✅ **Sin Encabezados Complejos**: Nombres de columnas simples con guiones bajos
- ✅ **Formato Empresarial**:
  - Encabezados con fondo azul corporativo (#1F4788) y texto blanco
  - Filas alternas en gris claro para mejor lectura
  - Bordes en todas las celdas
  - Texto centrado y alineado
- ✅ **Listo para Power BI**: Importación directa sin modificaciones
- ✅ **Columnas Ajustadas**: Anchos optimizados para cada tipo de dato

### Usar en Power BI

**Importación Directa (Sin Modificaciones):**

1. **Opción Recomendada**: Exporta un rango de fechas o el histórico completo
   - Para análisis mensual: Usa "📅 Exportar Rango de Fechas"
   - Para análisis completo: Usa "📚 Exportar Todo el Histórico"
2. Abre Power BI Desktop
3. Selecciona "Obtener datos" → "Excel"
4. Selecciona el archivo exportado
5. Marca la hoja correspondiente:
   - `Rango_Rutas` (para rango de fechas)
   - `Historico_Rutas` (para histórico completo)
6. Haz clic en "Cargar"
7. ¡Listo! Los datos están listos para crear visualizaciones

**Ventajas del Formato:**
- ✅ No requiere transformaciones en Power Query
- ✅ Columnas con nombres claros y sin espacios
- ✅ Tipos de datos correctos automáticamente
- ✅ Fecha en formato estándar para filtros temporales
- ✅ Todas las rutas y poblaciones listas para análisis

**Visualizaciones Sugeridas:**
- Gráfico de líneas: Población por fecha
- Gráfico de barras: Registros por ruta
- Tabla: Detalle de movimientos
- KPI: Total de personas transportadas
- Mapa de calor: Horarios más activos

## 💾 Almacenamiento de Datos

- **Sistema de Histórico por Fechas**: Los datos se organizan automáticamente por fecha
- **Cambio de Fecha**: Al cambiar la fecha, se muestran solo los registros de esa fecha
- **Persistencia**: Los datos persisten incluso si cierras el navegador
- **Histórico Completo**: Todos los registros de todas las fechas se mantienen guardados
- Para limpiar los datos: Abre la consola del navegador (F12) y ejecuta:
  ```javascript
  localStorage.clear();
  location.reload();
  ```

## 📅 Gestión de Fechas

- **Fecha Actual**: Muestra y edita solo los registros de la fecha seleccionada
- **Cambio de Fecha**: Al cambiar la fecha en el selector, automáticamente:
  - Se guardan los registros de la fecha anterior
  - Se cargan los registros de la nueva fecha (si existen)
  - Se muestra una tabla vacía si no hay registros para esa fecha
- **Histórico**: Todas las fechas con sus registros se mantienen guardadas

## 📊 Estadísticas

El sistema muestra dos tarjetas de estadísticas:
- **Total Registros**: Cantidad total de registros en la tabla
- **Registros Hoy**: Registros con fecha de hoy

## 🎨 Paleta de Colores

- **Primario**: Morado (#6366f1)
- **Secundario**: Púrpura (#8b5cf6)
- **Acento**: Rosa (#ec4899)
- **Éxito**: Verde (#10b981)
- **Advertencia**: Naranja (#f59e0b)
- **Peligro**: Rojo (#ef4444)

## 📱 Compatibilidad

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Edge
- ✅ Safari
- ✅ Opera
- ✅ Dispositivos móviles (iOS y Android)

## 🔧 Estructura del Proyecto

```
rutas-transporte/
│
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos y diseño
├── js/
│   └── app.js          # Lógica y funcionalidad
└── README.md           # Este archivo
```

## 📝 Notas Importantes

- Los datos se almacenan localmente en tu navegador
- No se requiere conexión a internet después de cargar la página
- La librería XLSX se carga desde CDN para la exportación a Excel
- Recomendado hacer respaldos periódicos exportando a Excel

## 🆘 Solución de Problemas

### La exportación a Excel no funciona
- Verifica que tengas conexión a internet (se necesita para cargar la librería XLSX)
- Asegúrate de que tu navegador permita descargas

### Los datos no se guardan
- Verifica que tu navegador permita el uso de LocalStorage
- No uses modo incógnito/privado

### La página no se ve bien
- Actualiza tu navegador a la última versión
- Limpia la caché del navegador (Ctrl + F5)

## 📧 Soporte

Para reportar problemas o sugerencias, contacta al administrador del sistema.

## 📄 Licencia

Este proyecto es de uso interno para gestión de rutas de transporte.

---

**Desarrollado con ❤️ para optimizar la gestión de rutas de transporte**