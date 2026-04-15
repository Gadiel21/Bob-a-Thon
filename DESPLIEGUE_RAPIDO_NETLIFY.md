# 🚀 Despliegue Rápido en Netlify (5 minutos)

## Pasos Simples para Publicar tu Aplicación

### 1️⃣ Crear Cuenta (2 minutos)

1. Ve a: **https://www.netlify.com**
2. Haz clic en **"Sign up"**
3. Regístrate con tu email o GitHub
4. Confirma tu email

### 2️⃣ Preparar Archivos (1 minuto)

**IMPORTANTE:** Asegúrate de tener estos archivos en la carpeta `rutas-transporte`:
- ✅ index.html
- ✅ css/styles.css
- ✅ js/app.js
- ✅ README.md

### 3️⃣ Desplegar (2 minutos)

1. **Inicia sesión en Netlify**
   - Ve a tu dashboard: https://app.netlify.com

2. **Arrastra y Suelta**
   - Busca el área que dice: **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**
   - Arrastra la carpeta completa `rutas-transporte` a esa área
   - O haz clic en "browse to upload" y selecciona la carpeta

3. **Espera 30 segundos**
   - Netlify procesará y publicará tu sitio
   - Verás una barra de progreso

4. **¡Listo!**
   - Tu sitio estará en una URL como: `https://random-name-123456.netlify.app`

### 4️⃣ Personalizar URL (Opcional - 1 minuto)

1. En tu sitio desplegado, haz clic en **"Site settings"**
2. En "Site information", haz clic en **"Change site name"**
3. Escribe un nombre único, por ejemplo:
   - `rutas-transporte-miempresa`
   - `sistema-rutas-2026`
   - `gestion-rutas-transporte`
4. Tu nueva URL será: `https://tu-nombre.netlify.app`

### 5️⃣ Compartir con Empleados

**Copia la URL y compártela:**
- Por WhatsApp
- Por Email
- En un documento impreso
- En la intranet de la empresa

**Ejemplo de mensaje:**
```
🚌 Sistema de Gestión de Rutas

Accede desde cualquier dispositivo:
https://rutas-transporte-miempresa.netlify.app

- Funciona en computadoras, tablets y celulares
- Guarda tus datos automáticamente
- Exporta a Excel para reportes
```

---

## 🔄 Actualizar la Aplicación

Cuando hagas cambios en tu aplicación:

1. Ve a tu sitio en Netlify
2. Haz clic en la pestaña **"Deploys"**
3. Arrastra la carpeta actualizada al área de "Drag and drop"
4. Los cambios se aplicarán en 30 segundos

---

## 📱 Agregar a Pantalla de Inicio (Móviles)

Tus empleados pueden agregar la app a su pantalla de inicio:

**En Android (Chrome):**
1. Abre la URL en Chrome
2. Toca el menú (⋮)
3. Selecciona "Agregar a pantalla de inicio"
4. Confirma

**En iPhone (Safari):**
1. Abre la URL en Safari
2. Toca el botón de compartir (□↑)
3. Selecciona "Agregar a pantalla de inicio"
4. Confirma

---

## ⚠️ Nota Importante sobre Datos

**Con esta configuración:**
- ✅ Cada empleado puede acceder desde cualquier lugar
- ✅ Los datos se guardan en su navegador
- ❌ Los datos NO se comparten entre empleados
- ❌ Si borran el caché del navegador, pierden sus datos

**Para datos compartidos entre todos:**
- Necesitas implementar una base de datos (Firebase)
- Ver archivo: `GUIA_DESPLIEGUE_WEB.md` para más opciones

---

## 🆘 Solución de Problemas

### "El sitio no carga"
- Verifica que subiste TODOS los archivos
- Asegúrate de que `index.html` esté en la raíz de la carpeta

### "Los estilos no se ven"
- Verifica que la carpeta `css` esté incluida
- Revisa que el archivo se llame `styles.css`

### "No funciona la exportación a Excel"
- Verifica que tengas conexión a internet
- La librería XLSX se carga desde CDN

---

## 📊 Ventajas de Netlify

✅ **GRATIS** para siempre
✅ **SSL/HTTPS** automático (seguro)
✅ **Rápido** - CDN global
✅ **Fácil** - Sin código ni comandos
✅ **Confiable** - 99.9% uptime
✅ **Sin límites** de visitantes (en plan gratuito)

---

## 🎯 Siguiente Paso

Una vez desplegado, considera:
1. **Capacitar a tus empleados** sobre cómo usar la aplicación
2. **Crear un manual de usuario** con capturas de pantalla
3. **Establecer un proceso** de respaldo (exportar a Excel regularmente)
4. **Evaluar si necesitas** datos compartidos (Firebase)

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas o preguntas:
1. Revisa la guía completa: `GUIA_DESPLIEGUE_WEB.md`
2. Consulta la documentación de Netlify: https://docs.netlify.com
3. Pide ayuda específica sobre lo que necesites

---

**¡Tu aplicación estará en línea en menos de 5 minutos! 🚀**