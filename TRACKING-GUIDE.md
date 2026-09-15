# Guía de Verificación de Tracking - Fertilite IVF Funnel

## Para el equipo de Adview

Esta guía indica dónde verificar la implementación de los eventos de tracking solicitados.

---

## Archivos Principales

### 1. **Tags de Google y Facebook** → `/index.html`
**Ubicación:** Raíz del proyecto  
**Qué verificar:**
- **Líneas 55-63:** Google Ads (AW-699207728) + Google Analytics (G-8X7FFQRYJS)
- **Líneas 66-78:** Meta Pixel de Facebook (480677391421581)
- **Líneas 30-53:** Google Consent Mode v2 (GDPR/CCPA)

### 2. **Evento de Formulario** → `/src/app/pages/Contact.tsx`
**Ubicación:** Página de contacto (último paso del funnel)  
**Qué verificar:**
- **Líneas 35-41:** Handler del formulario que dispara el evento `adw_formulario_contacto`
- Se activa cuando el usuario completa y envía el formulario de contacto
- Envía evento tanto a Google como a Facebook

### 3. **Eventos de Botones de Contacto** → `/src/app/pages/Results.tsx`
**Ubicación:** Página de resultados con CTAs de contacto  
**Qué verificar:**
- **Líneas 34-43:** Botón de WhatsApp → dispara `adw_telefono_whatsapp`
- **Líneas 45-54:** Botón de llamada → dispara `adw_telefono_llamada`
- **Líneas 56-65:** Botón de email → dispara `adw_correo_contacto`
- Los tres botones envían eventos a Google Analytics y Facebook Pixel

### 4. **Configuración de Seguridad** → `/vercel.json`
**Ubicación:** Raíz del proyecto  
**Qué verificar:**
- **Línea 32:** Content-Security-Policy permite todos los dominios de Google y Facebook
- Previene que el navegador bloquee los scripts de tracking

---

## Cómo Navegar en GitHub

1. Ir a: `https://github.com/dhernandezsolyman/fertilite-ivf-funnel`
2. Hacer clic en las rutas de archivo mencionadas arriba
3. Usar Ctrl+G (o Cmd+G en Mac) para saltar a números de línea específicos

---

## Referencia de Eventos Implementados

| Evento | Descripción | Ubicación |
|--------|-------------|-----------|
| `adw_formulario_contacto` | Envío del formulario de contacto | Contact.tsx línea 37, 40 |
| `adw_telefono_whatsapp` | Clic en botón de WhatsApp | Results.tsx línea 37, 40 |
| `adw_telefono_llamada` | Clic en botón de llamada | Results.tsx línea 48, 51 |
| `adw_correo_contacto` | Clic en botón de email | Results.tsx línea 59, 62 |

---

## Verificación en Producción

**URL del sitio:** https://start.fertilite.com

**Herramientas recomendadas:**
- Google Tag Assistant (extensión de Chrome)
- Facebook Pixel Helper (extensión de Chrome)

**Qué verificar:**
1. Que ambos tags (Google y Facebook) se cargan correctamente
2. Que no hay errores de CSP en la consola del navegador
3. Que los eventos se disparan al:
   - Enviar el formulario de contacto
   - Hacer clic en cualquier botón de contacto (WhatsApp, teléfono, email)

---

## Notas Técnicas

- **Framework:** React 19 + TypeScript
- **Tracking:** Implementado nativamente en los componentes React (no jQuery)
- **Dual tracking:** Todos los eventos se envían tanto a Google (gtag) como a Facebook (fbq)
- **Consent Mode:** Implementado según estándares GDPR/CCPA

---

Si tienen preguntas o necesitan verificar algo adicional, no duden en contactarnos.
