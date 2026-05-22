import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase.js";

// ============================================================
// ICON PRODUCE BRAND
// ============================================================
const BRAND = {
  primary: "#5B2C8B",      // morado principal
  primaryDark: "#3D1A5B",  // morado oscuro (headers)
  primaryLight: "#7B3FB5", // morado claro (gradients)
  accent: "#FFD93D",       // amarillo principal
  accentLight: "#FFF4B8",  // amarillo claro (backgrounds)
  accentDark: "#E8B900",   // amarillo oscuro
};

// Official Icon Produce logos served from /public folder
// - logo-icon.png: square purple bg with yellow "P" symbol (compact spaces)
// - logo-horizontal.png: horizontal lockup with full company name (headers)

// Compact icon (yellow "P" on purple) — for small spaces, kiosk header, etc.
function BrandIcon({ size = 36, rounded = true }) {
  return (
    <img
      src="/logo-icon.png"
      alt="Icon Produce"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        borderRadius: rounded ? Math.round(size * 0.18) : 0,
        display: "block",
      }}
    />
  );
}

// Horizontal logo with company name — for main headers, login, marketing
function BrandLogo({ height = 40 }) {
  return (
    <img
      src="/logo-horizontal.png"
      alt="Icon Produce LLC"
      style={{
        height,
        width: "auto",
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}

// ============================================================
// MASKED ID COMPONENT (privacy - hides ID behind dots)
// ============================================================
// Shows "••••••••" by default. Click eye icon to reveal/hide.
function MaskedId({ value, lang, inline = false }) {
  const [visible, setVisible] = useState(false);
  if (!value) return <span>—</span>;
  const masked = "•".repeat(Math.min(value.length, 10));
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontVariantNumeric: "tabular-nums" }}>
      <span style={{ fontFamily: "monospace", letterSpacing: visible ? 0 : 2 }}>
        {visible ? value : masked}
      </span>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setVisible(v => !v); }}
        title={visible ? (lang ? t(lang, "hideId") : "Hide") : (lang ? t(lang, "showId") : "Show ID")}
        style={{
          background: "none",
          border: "none",
          padding: inline ? "0 2px" : "2px 6px",
          cursor: "pointer",
          color: "#5B2C8B",
          fontSize: 14,
          lineHeight: 1,
        }}>
        {visible ? "🙈" : "👁"}
      </button>
    </span>
  );
}

// ============================================================
// CONFIG
// ============================================================
const TOTAL_DOORS = 5;
const DOORS = ["19", "20", "22", "23", "24"];

// Timer thresholds (in minutes)
// Job Time: from door assignment to completion (warehouse efficiency)
const THRESHOLD_YELLOW = 30;
const THRESHOLD_RED = 45;
// Wait Time: from check-in to door assignment (ops team responsiveness)
const WAIT_THRESHOLD_YELLOW = 15;
const WAIT_THRESHOLD_RED = 25;

// Manager PIN (in production, this would come from secure backend)
const MANAGER_PIN_DEFAULT = "1234"; // Used if settings table is unavailable
const KIOSK_PIN_DEFAULT = "1234";

const OVERRIDE_REASONS = ["VIP Customer", "Urgent / Emergency", "Correction / Error", "Other"];

// ============================================================
// TRANSLATIONS (i18n)
// ============================================================
const TRANSLATIONS = {
  es: {
    // App
    appTitle: "Icon Produce",
    appSub: "Centro de Control de Operaciones",
    legend: "🟢 A TIEMPO: 0-30m · 🟡 ALERTA: 30-45m · 🔴 RETRASADO: 45m+",
    legendJob: "⏱ TIEMPO DE CARGA",
    legendWait: "⏳ TIEMPO DE ESPERA",
    waitTime: "esperando",
    jobTime: "cargando",

    // Tabs
    tabDashboard: "📊 Tablero",
    tabCheckIn: "➕ Registro",
    tabSMS: "📨 SMS",
    tabAudit: "📜 Auditoría",

    // KPIs
    kpiInQueue: "EN COLA",
    kpiActive: "ACTIVOS",
    kpiActiveSub: "puertas",
    kpiWarning: "⚠️ ALERTA",
    kpiWarningSub: "30-45 min",
    kpiDelayed: "🚨 RETRASADO",
    kpiDelayedSub: "45+ min",
    kpiAvg: "TIEMPO PROM.",
    kpiAvgSub: "completados hoy",
    kpiAvgWait: "ESPERA PROM.",
    kpiAvgWaitSub: "check-in → puerta",
    kpiAvgJob: "CARGA PROM.",
    kpiAvgJobSub: "puerta → completado",

    // Dock board
    dockTitle: "🚪 PUERTAS — Estado en Vivo",
    dockEmpty: "VACÍA",
    statusOnTime: "A TIEMPO",
    statusWarning: "ALERTA",
    statusDelayed: "RETRASADO",

    // Queue
    queueTitle: "📋 COLA",
    queueWaiting: "esperando",
    queueDoor: "puerta",
    queueDoors: "puertas",
    queueAvailable: "disponible",
    queueAvailables: "disponibles",
    queueEmpty: "Cola vacía",
    queueEmptySub: "Todos los conductores tienen puerta asignada",
    queueAutoAssign: "⚡ Asignar Auto",
    queueManual: "🔒 Manual (Gerente)",
    queueAssignDoor: "Asignar Puerta",

    // Status labels
    statusQueued: "En Cola",
    statusAssigned: "Puerta Asignada",
    statusLoading: "Cargando",
    statusReady: "Listo para Salir",
    statusCompleted: "Completado",

    // Check-in form
    formTitle: "Registro de Conductor",
    formSub: "Todos los campos con * son obligatorios",
    formPickupLabel: "🔑 ORDEN DE VENTA / PICK-UP #",
    formPickupSub: "Solo números — validado en vivo con Silo",
    formPickupPlaceholder: "Ingresa # de orden (ej. 10234)",
    formPickupChecking: "⏳ Verificando con Silo...",
    formPickupValid: "Orden #{n} confirmada en Silo",
    formPickupValidSub: "Conductor autorizado a continuar.",
    formPickupNotFound: "⛔ Orden #{n} NO ENCONTRADA en Silo.",
    formPickupNotFoundSub: "Registro bloqueado. Verifica con despacho.",
    formPickupRequired: "El número de orden es OBLIGATORIO",
    formPickupBlocked: "Orden NO ENCONTRADA en Silo — registro bloqueado",
    formDemoNumbers: "Demo: 10234, 10235, 10236, 10237, 10238, 10240, 10241, 10245, 10250, 10267",

    sectionDriverInfo: "INFORMACIÓN DEL CONDUCTOR",
    sectionTruckInfo: "INFORMACIÓN DEL CAMIÓN",
    sectionVerification: "VERIFICACIÓN DE IDENTIDAD",

    fieldIdNumber: "ID / Licencia #",
    fieldFirstName: "Nombre",
    fieldLastName: "Apellido",
    fieldPhone: "Teléfono",
    fieldCompany: "Empresa / Transportista",
    fieldTruckType: "Tipo de Camión",
    fieldTruckTypeSelect: "Selecciona tipo...",
    fieldPlate: "Placa",
    fieldRequired: "Obligatorio",
    fieldPhoneInvalid: "Ingresa 10 dígitos",
    fieldSelectType: "Selecciona tipo",

    welcomeBack: "✅ ¡Bienvenido de vuelta, {name}! Datos en archivo.",
    firstTimeDetected: "🆕 Conductor nuevo. Completa selfie + firma abajo.",

    consentText: "Doy mi consentimiento a Icon Produce para capturar y almacenar mi foto y firma con fines de verificación. Se conservarán hasta 90 días. Solo personal autorizado.",
    consentRequired: "Se requiere consentimiento para conductores nuevos",
    consentFirst: "Acepta el consentimiento primero",

    selfieLabel: "📸 Selfie del Conductor",
    selfieRequired: "Selfie requerido para conductores nuevos",
    selfieTake: "📸 Tomar Selfie",
    selfieRetake: "🔄 Repetir",

    signatureLabel: "✍️ Firma Digital",
    signatureRequired: "Firma requerida para conductores nuevos",
    signatureSign: "✍️ Firmar",
    signatureRedo: "🔄 Rehacer",

    formInfoBox: "ℹ️ Después de enviar: el conductor entra a la cola. El sistema asigna automáticamente la siguiente puerta disponible por orden de llegada.",
    formSubmit: "Enviar y Agregar a Cola →",
    formSubmitted: "✓ ¡Agregado a la Cola!",

    // Camera
    camTitle: "Tomar Selfie",
    camSub: "Mira directo a la cámara",
    camDenied: "Acceso a cámara denegado. Por favor habilita los permisos.",
    camFlip: "🔄 Cambiar",
    camCapture: "📸 Capturar",

    // Signature
    sigTitle: "Firma Digital",
    sigSub: "Firma con tu dedo o el mouse",
    sigClear: "🗑 Limpiar",
    sigSave: "✓ Guardar",

    // Manager PIN
    pinTitle: "Override de Gerente",
    pinSub: "Asignación manual para {name}",
    pinPrompt: "Ingresa PIN de Gerente",
    pinIncorrect: "PIN incorrecto",
    pinUnlock: "🔓 Desbloquear",
    pinDemoHint: "PIN demo: 1234",

    // Override reason
    overrideTitle: "Override de Gerente",
    overrideSub: "{action} para {name}",
    overrideAction: "Asignar Puerta {door}",
    overrideSelectReason: "Selecciona razón",
    overrideOtherPlaceholder: "Describe la razón...",
    palletCountLabel: "Número de Pallets",
    palletCountPlaceholder: "Ej: 24",
    palletCountRequired: "Ingresa el número de pallets",
    palletCountSub: "Cantidad de pallets en esta carga",
    showId: "Ver ID",
    hideId: "Ocultar",

    // Settings tab
    tabSettings: "⚙️ Configuración",
    settingsTitle: "Configuración",
    settingsKioskPin: "PIN del Kiosko (Tablet)",
    settingsKioskPinSub: "Para activar la tablet de check-in",
    settingsManagerPin: "PIN del Manager",
    settingsManagerPinSub: "Para overrides y acciones críticas",
    settingsSavePin: "Guardar",
    settingsPinSaved: "✓ Guardado",
    settingsPinFormat: "Debe ser 4 dígitos numéricos",
    settingsSalesOrders: "Órdenes de Venta Válidas",
    settingsSalesOrdersSub: "Estas son las órdenes que el sistema acepta para check-in",
    settingsAddOrder: "Agregar Orden",
    settingsAddOrderPlaceholder: "Ej: 10300",
    settingsRemoveOrder: "Eliminar",
    settingsNoOrders: "No hay órdenes registradas. Agrega al menos una.",
    settingsConfirmRemove: "¿Eliminar orden {n}?",

    // Complete confirmation
    completeConfirmTitle: "¿Finalizar trabajo?",
    completeConfirmMsg: "Esto marcará el trabajo de {name} como completado. ¿Continuar?",
    completeConfirmBtn: "Sí, Finalizar",

    // Completed tab
    tabCompleted: "✅ Completados",
    completedTitle: "Completados Hoy",
    completedEmpty: "Aún no hay trabajos completados hoy",
    completedDoor: "Puerta",
    completedPallets: "Pallets",
    completedPlate: "Placa",
    completedWait: "Espera",
    completedLoad: "Carga",
    completedTotal: "Total",
    completedAt: "Completado a las",
    completedViewDetails: "Ver Detalles",
    overrideConfirm: "Confirmar Override",
    reasonVIP: "Cliente VIP",
    reasonUrgent: "Urgente / Emergencia",
    reasonError: "Corrección / Error",
    reasonOther: "Otro",

    // Manual assign
    manualTitle: "Asignación Manual de Puerta",
    manualWarning: "⚠️ El override manual quedará registrado en la auditoría.",
    manualBusy: "ocupada",
    manualAssignBtn: "Asignar Puerta {door}",

    // Driver detail
    detailUpdateStatus: "ACTUALIZAR ESTADO",
    detailCompany: "Empresa",
    detailTruck: "Camión",
    detailPhone: "Teléfono",
    detailId: "ID",
    detailCheckedIn: "Registrado",
    detailViewId: "🪪 Ver Identidad",
    detailSendSMS: "📱 Enviar SMS",

    // Identity modal
    identityTitle: "Identidad del Conductor",
    identitySelfie: "📸 Selfie",
    identitySignature: "✍️ Firma",

    // SMS
    smsTitle: "Enviar SMS",
    smsTo: "Para",
    smsCancel: "Cancelar",
    smsSend: "Enviar SMS",
    smsSent: "✓ ¡Enviado!",
    smsCharCount: "{n} / 160 caracteres",
    smsTemplateAssigned: "Hola {name}, te asignamos la Puerta {door}. Orden #{order}. — Icon Produce",
    smsTemplateReady: "Hola {name}, tu carga en la Puerta {door} está LISTA para recoger. — Icon Produce",
    smsEmpty: "Aún no se han enviado mensajes",

    // Audit
    auditEmpty: "Aún no hay overrides de gerente",
    auditEmptySub: "Todas las acciones manuales quedarán registradas aquí",
    auditAction: "Asignación Manual de Puerta",
    auditDriver: "Conductor",
    auditDetails: "Asignado a Puerta {door} (saltando orden de cola)",

    // Common
    cancel: "Cancelar",
    close: "Cerrar",
    save: "Guardar",
    confirm: "Confirmar",

    // Day-close report
    closeDay: "📦 Cerrar Día",
    closeDayLoading: "⏳ Generando reporte...",
    closeDayDone: "✓ ¡Reporte descargado!",
    closeDayNoData: "No hay transacciones completadas hoy todavía",
    closeDayConfirmTitle: "Cerrar Día y Generar Reporte",
    closeDayConfirmMsg: "Se generará un PDF por cada conductor completado hoy ({n} en total) y se descargará un ZIP. ¿Continuar?",
    closeDayBtn: "Generar y Descargar",
    closeDayAutoNote: "ℹ️ Tip: En la versión final con backend, este reporte llegará automáticamente a tu email a las 11:59 PM cada día.",

    // PDF labels
    pdfTitle: "RECIBO DE REGISTRO",
    pdfSub: "Reporte de Transacción",
    pdfOrder: "Orden #",
    pdfDate: "Fecha",
    pdfDriver: "CONDUCTOR",
    pdfName: "Nombre",
    pdfId: "ID / Licencia",
    pdfPhone: "Teléfono",
    pdfTruck: "CAMIÓN / TRAILER",
    pdfCompany: "Empresa",
    pdfTruckType: "Tipo",
    pdfPlate: "Placa / Trailer",
    pdfTimes: "TIEMPOS",
    pdfCheckIn: "Registro",
    pdfDoorAssigned: "Puerta Asignada",
    pdfCompleted: "Completado",
    pdfTotalTime: "Tiempo Total",
    pdfWaitTime: "Tiempo de Espera",
    pdfJobTime: "Tiempo de Carga",
    pdfPallets: "Pallets",
    pdfDoor: "Puerta",
    pdfSelfie: "Selfie del Conductor",
    pdfSignature: "Firma",
    pdfFooter: "Icon Produce — Generado automáticamente",
    pdfSummaryTitle: "Resumen del Día",

    // Kiosk mode (driver tablet)
    kioskWelcomeTitle: "Bienvenido a Icon Produce",
    kioskWelcomeSub: "Toca el botón para registrar tu llegada",
    kioskStartBtn: "Iniciar Registro",
    kioskSuccessTitle: "¡Registro Completado!",
    kioskSuccessSub: "Por favor espera, te asignaremos una puerta y te enviaremos un mensaje de texto.",
    kioskSuccessName: "Nombre",
    kioskSuccessOrder: "Orden",
    kioskSuccessAutoReset: "Esta pantalla se cerrará en {n} segundos",
    kioskSuccessEdit: "✏️ Corregir mi información",
    kioskSuccessNew: "✓ Listo, registrar otro conductor",
    kioskSetupTitle: "Configuración de Tablet",
    kioskSetupSub: "Activa esta tablet en modo Check-In",
    kioskSetupPin: "Ingresa PIN de configuración",
    kioskSetupActivate: "🔓 Activar Tablet",
    kioskSetupHint: "PIN demo: 1234",
    kioskActivated: "✅ Tablet activada",
    kioskExitMode: "Salir del modo kiosk",
    kioskBackToWelcome: "← Cancelar",

    // Login
    loginTitle: "Iniciar Sesión",
    loginSub: "Accede al panel de operaciones",
    loginEmail: "Correo Electrónico",
    loginPassword: "Contraseña",
    loginBtn: "🔐 Iniciar Sesión",
    loginLoading: "⏳ Verificando...",
    loginForgot: "¿Olvidaste tu contraseña?",
    loginErrorInvalid: "Correo o contraseña incorrectos",
    loginErrorEmpty: "Completa todos los campos",
    loginNeedAccess: "¿Necesitas acceso? Contacta a tu administrador",
    loginForgotTitle: "Recuperar Contraseña",
    loginForgotSub: "Te enviaremos un enlace de recuperación",
    loginForgotBtn: "Enviar Enlace",
    loginForgotBack: "← Volver al login",
    loginForgotSent: "✓ Si el correo existe, recibirás un enlace",
    logout: "Cerrar Sesión",
    logoutConfirm: "¿Cerrar sesión?",
  },

  en: {
    // App
    appTitle: "Icon Produce",
    appSub: "Operations Control Center",
    legend: "🟢 ON TIME: 0-30m · 🟡 WARNING: 30-45m · 🔴 DELAYED: 45m+",
    legendJob: "⏱ LOADING TIME",
    legendWait: "⏳ WAIT TIME",
    waitTime: "waiting",
    jobTime: "loading",

    // Tabs
    tabDashboard: "📊 Dashboard",
    tabCheckIn: "➕ Check-In",
    tabSMS: "📨 SMS",
    tabAudit: "📜 Audit",

    // KPIs
    kpiInQueue: "IN QUEUE",
    kpiActive: "ACTIVE",
    kpiActiveSub: "doors",
    kpiWarning: "⚠️ WARNING",
    kpiWarningSub: "30-45 min",
    kpiDelayed: "🚨 DELAYED",
    kpiDelayedSub: "45+ min",
    kpiAvg: "AVG TIME",
    kpiAvgSub: "done today",
    kpiAvgWait: "AVG WAIT",
    kpiAvgWaitSub: "check-in → door",
    kpiAvgJob: "AVG LOADING",
    kpiAvgJobSub: "door → completed",

    // Dock board
    dockTitle: "🚪 DOCK BOARD — Live Status",
    dockEmpty: "EMPTY",
    statusOnTime: "ON TIME",
    statusWarning: "WARNING",
    statusDelayed: "DELAYED",

    // Queue
    queueTitle: "📋 QUEUE",
    queueWaiting: "waiting",
    queueDoor: "door",
    queueDoors: "doors",
    queueAvailable: "available",
    queueAvailables: "available",
    queueEmpty: "Queue is empty",
    queueEmptySub: "All drivers have been assigned",
    queueAutoAssign: "⚡ Auto-Assign",
    queueManual: "🔒 Manual (Manager)",
    queueAssignDoor: "Assign Door",

    // Status labels
    statusQueued: "In Queue",
    statusAssigned: "Door Assigned",
    statusLoading: "Loading",
    statusReady: "Ready to Leave",
    statusCompleted: "Completed",

    // Check-in form
    formTitle: "New Driver Check-In",
    formSub: "All fields marked * are required",
    formPickupLabel: "🔑 SALES ORDER / PICK-UP #",
    formPickupSub: "Numbers only — validated live against Silo",
    formPickupPlaceholder: "Enter order # (e.g., 10234)",
    formPickupChecking: "⏳ Checking Silo...",
    formPickupValid: "Order #{n} confirmed in Silo",
    formPickupValidSub: "Driver authorized to proceed.",
    formPickupNotFound: "⛔ Order #{n} NOT FOUND in Silo.",
    formPickupNotFoundSub: "Check-in blocked. Verify with dispatch.",
    formPickupRequired: "Sales Order # is REQUIRED",
    formPickupBlocked: "Order NOT FOUND in Silo — check-in blocked",
    formDemoNumbers: "Demo: 10234, 10235, 10236, 10237, 10238, 10240, 10241, 10245, 10250, 10267",

    sectionDriverInfo: "DRIVER INFORMATION",
    sectionTruckInfo: "TRUCK INFORMATION",
    sectionVerification: "IDENTITY VERIFICATION",

    fieldIdNumber: "ID / License #",
    fieldFirstName: "First Name",
    fieldLastName: "Last Name",
    fieldPhone: "Phone Number",
    fieldCompany: "Company / Carrier",
    fieldTruckType: "Truck Type",
    fieldTruckTypeSelect: "Select type...",
    fieldPlate: "Plate Number",
    fieldRequired: "Required",
    fieldPhoneInvalid: "Enter 10-digit number",
    fieldSelectType: "Select type",

    welcomeBack: "✅ Welcome back, {name}! Info on file.",
    firstTimeDetected: "🆕 First-time driver. Complete selfie + signature below.",

    consentText: "I consent to Icon Produce capturing and storing my photo and signature for verification. Retained for up to 90 days. Authorized personnel only.",
    consentRequired: "Consent required for first-time drivers",
    consentFirst: "Accept consent first",

    selfieLabel: "📸 Driver Selfie",
    selfieRequired: "Selfie required for first-time drivers",
    selfieTake: "📸 Take Selfie",
    selfieRetake: "🔄 Retake",

    signatureLabel: "✍️ Digital Signature",
    signatureRequired: "Signature required for first-time drivers",
    signatureSign: "✍️ Sign",
    signatureRedo: "🔄 Redo",

    formInfoBox: "ℹ️ After submitting: Driver enters the queue. System will auto-assign the next available door on a first-come basis.",
    formSubmit: "Submit & Add to Queue →",
    formSubmitted: "✓ Added to Queue!",

    // Camera
    camTitle: "Take Selfie",
    camSub: "Look directly at the camera",
    camDenied: "Camera access denied. Please enable camera permissions.",
    camFlip: "🔄 Flip",
    camCapture: "📸 Capture",

    // Signature
    sigTitle: "Digital Signature",
    sigSub: "Sign with your finger or mouse",
    sigClear: "🗑 Clear",
    sigSave: "✓ Save",

    // Manager PIN
    pinTitle: "Manager Override",
    pinSub: "Manual door assign for {name}",
    pinPrompt: "Enter Manager PIN",
    pinIncorrect: "Incorrect PIN",
    pinUnlock: "🔓 Unlock",
    pinDemoHint: "Demo PIN: 1234",

    // Override reason
    overrideTitle: "Manager Override",
    overrideSub: "{action} for {name}",
    overrideAction: "Assign Door {door}",
    overrideSelectReason: "Select reason",
    overrideOtherPlaceholder: "Describe reason...",
    palletCountLabel: "Pallet Count",
    palletCountPlaceholder: "Ex: 24",
    palletCountRequired: "Enter pallet count",
    palletCountSub: "Number of pallets in this load",
    showId: "Show ID",
    hideId: "Hide",

    // Settings tab
    tabSettings: "⚙️ Settings",
    settingsTitle: "Settings",
    settingsKioskPin: "Kiosk PIN (Tablet)",
    settingsKioskPinSub: "To activate the check-in tablet",
    settingsManagerPin: "Manager PIN",
    settingsManagerPinSub: "For overrides and critical actions",
    settingsSavePin: "Save",
    settingsPinSaved: "✓ Saved",
    settingsPinFormat: "Must be 4 numeric digits",
    settingsSalesOrders: "Valid Sales Orders",
    settingsSalesOrdersSub: "These are the orders the system accepts for check-in",
    settingsAddOrder: "Add Order",
    settingsAddOrderPlaceholder: "Ex: 10300",
    settingsRemoveOrder: "Remove",
    settingsNoOrders: "No orders yet. Add at least one.",
    settingsConfirmRemove: "Remove order {n}?",

    // Complete confirmation
    completeConfirmTitle: "Finalize job?",
    completeConfirmMsg: "This will mark {name}'s job as completed. Continue?",
    completeConfirmBtn: "Yes, Finalize",

    // Completed tab
    tabCompleted: "✅ Completed",
    completedTitle: "Completed Today",
    completedEmpty: "No completed jobs yet today",
    completedDoor: "Door",
    completedPallets: "Pallets",
    completedPlate: "Plate",
    completedWait: "Wait",
    completedLoad: "Load",
    completedTotal: "Total",
    completedAt: "Completed at",
    completedViewDetails: "View Details",
    overrideConfirm: "Confirm Override",
    reasonVIP: "VIP Customer",
    reasonUrgent: "Urgent / Emergency",
    reasonError: "Correction / Error",
    reasonOther: "Other",

    // Manual assign
    manualTitle: "Manual Door Assignment",
    manualWarning: "⚠️ Manual override will be logged in the audit trail.",
    manualBusy: "busy",
    manualAssignBtn: "Assign Door {door}",

    // Driver detail
    detailUpdateStatus: "UPDATE STATUS",
    detailCompany: "Company",
    detailTruck: "Truck",
    detailPhone: "Phone",
    detailId: "ID",
    detailCheckedIn: "Checked in",
    detailViewId: "🪪 View ID",
    detailSendSMS: "📱 Send SMS",

    // Identity modal
    identityTitle: "Driver Identity",
    identitySelfie: "📸 Selfie",
    identitySignature: "✍️ Signature",

    // SMS
    smsTitle: "Send SMS",
    smsTo: "To",
    smsCancel: "Cancel",
    smsSend: "Send SMS",
    smsSent: "✓ Sent!",
    smsCharCount: "{n} / 160 characters",
    smsTemplateAssigned: "Hi {name}, you have been assigned Door {door}. Order #{order}. — Icon Produce",
    smsTemplateReady: "Hi {name}, your load at Door {door} is READY for pickup. — Icon Produce",
    smsEmpty: "No SMS sent yet",

    // Audit
    auditEmpty: "No manager overrides yet",
    auditEmptySub: "All manual actions will be logged here",
    auditAction: "Manual Door Assignment",
    auditDriver: "Driver",
    auditDetails: "Assigned to Door {door} (bypassing queue order)",

    // Common
    cancel: "Cancel",
    close: "Close",
    save: "Save",
    confirm: "Confirm",

    // Day-close report
    closeDay: "📦 Close Day",
    closeDayLoading: "⏳ Generating report...",
    closeDayDone: "✓ Report downloaded!",
    closeDayNoData: "No completed transactions today yet",
    closeDayConfirmTitle: "Close Day and Generate Report",
    closeDayConfirmMsg: "A PDF will be generated for each driver completed today ({n} total) and downloaded as a ZIP. Continue?",
    closeDayBtn: "Generate and Download",
    closeDayAutoNote: "ℹ️ Tip: In the final version with backend, this report will arrive automatically to your email at 11:59 PM every day.",

    // PDF labels
    pdfTitle: "CHECK-IN RECEIPT",
    pdfSub: "Transaction Report",
    pdfOrder: "Order #",
    pdfDate: "Date",
    pdfDriver: "DRIVER",
    pdfName: "Name",
    pdfId: "ID / License",
    pdfPhone: "Phone",
    pdfTruck: "TRUCK / TRAILER",
    pdfCompany: "Company",
    pdfTruckType: "Type",
    pdfPlate: "Plate / Trailer",
    pdfTimes: "TIMES",
    pdfCheckIn: "Check-In",
    pdfDoorAssigned: "Door Assigned",
    pdfCompleted: "Completed",
    pdfTotalTime: "Total Time",
    pdfWaitTime: "Wait Time",
    pdfJobTime: "Loading Time",
    pdfPallets: "Pallets",
    pdfDoor: "Door",
    pdfSelfie: "Driver Selfie",
    pdfSignature: "Signature",
    pdfFooter: "Icon Produce — Auto-generated",
    pdfSummaryTitle: "Daily Summary",

    // Kiosk mode (driver tablet)
    kioskWelcomeTitle: "Welcome to Icon Produce",
    kioskWelcomeSub: "Tap the button to register your arrival",
    kioskStartBtn: "Start Check-In",
    kioskSuccessTitle: "Check-In Complete!",
    kioskSuccessSub: "Please wait — we will assign you a door and send you a text message shortly.",
    kioskSuccessName: "Name",
    kioskSuccessOrder: "Order",
    kioskSuccessAutoReset: "This screen will reset in {n} seconds",
    kioskSuccessEdit: "✏️ Correct my information",
    kioskSuccessNew: "✓ Done, register another driver",
    kioskSetupTitle: "Tablet Setup",
    kioskSetupSub: "Activate this tablet in Check-In mode",
    kioskSetupPin: "Enter setup PIN",
    kioskSetupActivate: "🔓 Activate Tablet",
    kioskSetupHint: "Demo PIN: 1234",
    kioskActivated: "✅ Tablet activated",
    kioskExitMode: "Exit kiosk mode",
    kioskBackToWelcome: "← Cancel",

    // Login
    loginTitle: "Log In",
    loginSub: "Access the operations panel",
    loginEmail: "Email",
    loginPassword: "Password",
    loginBtn: "🔐 Log In",
    loginLoading: "⏳ Verifying...",
    loginForgot: "Forgot your password?",
    loginErrorInvalid: "Invalid email or password",
    loginErrorEmpty: "Please complete all fields",
    loginNeedAccess: "Need access? Contact your administrator",
    loginForgotTitle: "Reset Password",
    loginForgotSub: "We'll send you a recovery link",
    loginForgotBtn: "Send Link",
    loginForgotBack: "← Back to login",
    loginForgotSent: "✓ If the email exists, you'll receive a link",
    logout: "Log Out",
    logoutConfirm: "Log out?",
  },
};

// Translation helper with variable interpolation
function t(lang, key, vars = {}) {
  let str = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  Object.keys(vars).forEach(k => { str = str.replace(`{${k}}`, vars[k]); });
  return str;
}

// Hook to manage language with localStorage persistence
function useLanguage() {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "es";
    const saved = window.localStorage?.getItem("producedock_lang");
    return saved === "en" || saved === "es" ? saved : "es";
  });
  const setLang = (newLang) => {
    setLangState(newLang);
    try { window.localStorage?.setItem("producedock_lang", newLang); } catch {}
  };
  return [lang, setLang];
}

// ============================================================
// SHARED STORAGE (Supabase-backed, with realtime sync)
// ============================================================
// Data lives in Supabase Postgres. Changes from any device
// are pushed via Realtime subscriptions so all connected tabs
// see updates instantly.

const STORAGE_KEY_KIOSK_ACTIVATED = "producedock_kiosk_activated";

// ============================================================
// SUPABASE STORAGE — Driver photos (selfies & signatures)
// ============================================================
// Photos are uploaded as Blobs to the 'driver-photos' bucket.
// The bucket is public (URLs are unguessable but readable by anyone with the link).
// In production with RLS, this should be changed to private + signed URLs.

const PHOTOS_BUCKET = 'driver-photos';

// Convert a base64 data URL (e.g., from canvas.toDataURL()) to a Blob
function base64ToBlob(dataUrl) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8 = new Uint8Array(n);
  while (n--) {
    u8[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8], { type: mime });
}

// Upload a base64 image to Storage and return the public URL
// kind: "selfie" | "signature"
async function uploadPhoto(base64DataUrl, idNumber, kind) {
  if (!base64DataUrl || !base64DataUrl.startsWith('data:')) {
    // Already a URL (returning driver) — return as is
    return base64DataUrl;
  }
  try {
    const blob = base64ToBlob(base64DataUrl);
    const ext = blob.type.includes('png') ? 'png' : 'jpg';
    // Build unique path: kind/idnumber-timestamp.ext
    const safeId = String(idNumber).replace(/[^a-zA-Z0-9-_]/g, '_');
    const timestamp = Date.now();
    const path = `${kind}/${safeId}-${timestamp}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(PHOTOS_BUCKET)
      .upload(path, blob, {
        contentType: blob.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error(`Error uploading ${kind}:`, uploadError);
      return null;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(PHOTOS_BUCKET)
      .getPublicUrl(path);

    return publicUrl;
  } catch (err) {
    console.error(`Error processing ${kind} upload:`, err);
    return null;
  }
}

// Helper: upload both selfie and signature in parallel, return URLs
async function uploadDriverPhotos(driver) {
  const [selfieUrl, signatureUrl] = await Promise.all([
    driver.selfie ? uploadPhoto(driver.selfie, driver.idNumber, 'selfie') : Promise.resolve(null),
    driver.signature ? uploadPhoto(driver.signature, driver.idNumber, 'signature') : Promise.resolve(null),
  ]);
  return { selfieUrl, signatureUrl };
}

// ============================================================
// HOOK: useSupabaseDrivers
// Manages the drivers table with realtime sync across all devices
// ============================================================
function useSupabaseDrivers() {
  const [drivers, setDriversState] = useState([]);
  const [loading, setLoading] = useState(true);

  // Convert DB row (snake_case) to app format (camelCase)
  const dbToApp = (row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    idNumber: row.id_number,
    phone: row.phone,
    company: row.company || "",
    plate: row.plate,
    pickupNumber: row.pickup_number,
    status: row.status,
    door: row.door,
    checkinTime: row.checkin_time,
    assignedTime: row.assigned_time,
    completedTime: row.completed_time,
    selfie: row.selfie_url,
    signature: row.signature_url,
    isReturning: row.is_returning_driver,
    palletCount: row.pallet_count,
  });

  // Convert app format (camelCase) to DB row (snake_case)
  const appToDb = (driver) => ({
    first_name: driver.firstName,
    last_name: driver.lastName,
    id_number: driver.idNumber,
    phone: driver.phone,
    company: driver.company || null,
    plate: driver.plate,
    pickup_number: driver.pickupNumber,
    status: driver.status || "queued",
    door: driver.door || null,
    checkin_time: driver.checkinTime || new Date().toISOString(),
    assigned_time: driver.assignedTime || null,
    completed_time: driver.completedTime || null,
    selfie_url: driver.selfie || null,
    signature_url: driver.signature || null,
    is_returning_driver: !!driver.isReturning,
    pallet_count: driver.palletCount || null,
  });

  // Load initial data + set up realtime subscription
  useEffect(() => {
    let mounted = true;

    // Initial load: get today's drivers (avoid loading old history)
    const loadDrivers = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .gte('checkin_time', today.toISOString())
        .order('checkin_time', { ascending: true });

      if (error) {
        console.error('Error loading drivers:', error);
        if (mounted) setLoading(false);
        return;
      }
      if (mounted) {
        setDriversState((data || []).map(dbToApp));
        setLoading(false);
      }
    };
    loadDrivers();

    // Realtime subscription: listen for any changes to drivers table
    const channel = supabase
      .channel('drivers-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'drivers' },
        (payload) => {
          if (!mounted) return;
          if (payload.eventType === 'INSERT') {
            const newDriver = dbToApp(payload.new);
            setDriversState(prev => {
              if (prev.some(d => d.id === newDriver.id)) return prev;
              return [...prev, newDriver];
            });
          } else if (payload.eventType === 'UPDATE') {
            const updated = dbToApp(payload.new);
            setDriversState(prev => prev.map(d => d.id === updated.id ? updated : d));
          } else if (payload.eventType === 'DELETE') {
            setDriversState(prev => prev.filter(d => d.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // Insert a new driver
  const addDriver = async (driver) => {
    // Step 1: Upload selfie + signature to Storage (if present and not already URLs)
    const { selfieUrl, signatureUrl } = await uploadDriverPhotos(driver);
    const driverWithUrls = {
      ...driver,
      selfie: selfieUrl,
      signature: signatureUrl,
    };

    // Step 2: Insert driver row with URLs (much smaller than base64)
    const { data, error } = await supabase
      .from('drivers')
      .insert([appToDb(driverWithUrls)])
      .select()
      .single();
    if (error) {
      console.error('Error adding driver:', error);
      alert('Error registering driver: ' + error.message);
      return null;
    }
    return dbToApp(data);
  };

  // Update an existing driver (status change, door assignment, etc.)
  const updateDriver = async (id, updates) => {
    const dbUpdates = {};
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.door !== undefined) dbUpdates.door = updates.door;
    if (updates.assignedTime !== undefined) dbUpdates.assigned_time = updates.assignedTime;
    if (updates.completedTime !== undefined) dbUpdates.completed_time = updates.completedTime;
    // For correction flow from kiosk
    if (updates.firstName !== undefined) dbUpdates.first_name = updates.firstName;
    if (updates.lastName !== undefined) dbUpdates.last_name = updates.lastName;
    if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
    if (updates.company !== undefined) dbUpdates.company = updates.company;
    if (updates.plate !== undefined) dbUpdates.plate = updates.plate;
    if (updates.pickupNumber !== undefined) dbUpdates.pickup_number = updates.pickupNumber;
    if (updates.palletCount !== undefined) dbUpdates.pallet_count = updates.palletCount;

    const { error } = await supabase
      .from('drivers')
      .update(dbUpdates)
      .eq('id', id);

    if (error) {
      console.error('Error updating driver:', error);
    }
  };

  return { drivers, addDriver, updateDriver, loading };
}

// ============================================================
// HOOK: useSupabaseHistory
// Manages driver_history for returning driver auto-fill
// ============================================================
function useSupabaseHistory() {
  const [history, setHistoryState] = useState({});

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data, error } = await supabase
        .from('driver_history')
        .select('*');
      if (error) {
        console.error('Error loading history:', error);
        return;
      }
      if (mounted) {
        const map = {};
        (data || []).forEach(row => {
          map[row.id_number] = {
            firstName: row.first_name,
            lastName: row.last_name,
            phone: row.phone,
            company: row.company || "",
            selfie: row.selfie_url,
            signature: row.signature_url,
          };
        });
        setHistoryState(map);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Upsert (insert or update) driver in history
  const addToHistory = async (driver) => {
    const row = {
      id_number: driver.idNumber,
      first_name: driver.firstName,
      last_name: driver.lastName,
      phone: driver.phone,
      company: driver.company || null,
      selfie_url: driver.selfie || null,
      signature_url: driver.signature || null,
      last_visit: new Date().toISOString(),
    };
    const { error } = await supabase
      .from('driver_history')
      .upsert(row, { onConflict: 'id_number' });
    if (error) {
      console.error('Error updating history:', error);
      return;
    }
    setHistoryState(prev => ({
      ...prev,
      [driver.idNumber]: {
        firstName: driver.firstName,
        lastName: driver.lastName,
        phone: driver.phone,
        company: driver.company || "",
        selfie: driver.selfie,
        signature: driver.signature,
      }
    }));
  };

  return { history, addToHistory };
}

// ============================================================
// HOOK: useSupabaseAudit
// Manages audit_log table with realtime sync
// ============================================================
function useSupabaseAudit() {
  const [auditLog, setAuditLog] = useState([]);

  const dbToApp = (row) => ({
    id: row.id,
    action: row.action,
    reason: row.reason,
    driverName: row.driver_name,
    pickupNumber: row.pickup_number,
    details: row.details,
    time: row.created_at,
  });

  useEffect(() => {
    let mounted = true;

    // Load today's audit log
    const load = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { data, error } = await supabase
        .from('audit_log')
        .select('*')
        .gte('created_at', today.toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading audit log:', error);
        return;
      }
      if (mounted) {
        setAuditLog((data || []).map(dbToApp));
      }
    };
    load();

    // Realtime subscription
    const channel = supabase
      .channel('audit-log-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'audit_log' },
        (payload) => {
          if (!mounted) return;
          const entry = dbToApp(payload.new);
          setAuditLog(prev => {
            if (prev.some(e => e.id === entry.id)) return prev;
            return [entry, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // Insert a new audit entry
  const addAudit = async (entry) => {
    const { error } = await supabase
      .from('audit_log')
      .insert([{
        action: entry.action,
        reason: entry.reason,
        driver_name: entry.driverName,
        pickup_number: entry.pickupNumber,
        details: entry.details || null,
      }]);
    if (error) {
      console.error('Error adding audit entry:', error);
    }
    // Realtime will pick it up automatically
  };

  return { auditLog, addAudit };
}

// ============================================================
// HOOK: useSupabaseSms
// Manages sms_log table with realtime sync
// ============================================================
function useSupabaseSms() {
  const [smsLog, setSmsLog] = useState([]);

  const dbToApp = (row) => ({
    id: row.id,
    driverId: row.driver_id,
    driver: {
      firstName: row.driver_name.split(' ')[0] || '',
      lastName: row.driver_name.split(' ').slice(1).join(' ') || '',
      phone: row.phone,
    },
    message: row.message,
    time: row.created_at,
  });

  useEffect(() => {
    let mounted = true;

    // Load today's SMS log
    const load = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { data, error } = await supabase
        .from('sms_log')
        .select('*')
        .gte('created_at', today.toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading SMS log:', error);
        return;
      }
      if (mounted) {
        setSmsLog((data || []).map(dbToApp));
      }
    };
    load();

    // Realtime subscription
    const channel = supabase
      .channel('sms-log-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'sms_log' },
        (payload) => {
          if (!mounted) return;
          const entry = dbToApp(payload.new);
          setSmsLog(prev => {
            if (prev.some(e => e.id === entry.id)) return prev;
            return [entry, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // Insert a new SMS entry
  const addSms = async (driver, message) => {
    const { error } = await supabase
      .from('sms_log')
      .insert([{
        driver_id: driver.id || null,
        driver_name: `${driver.firstName} ${driver.lastName}`,
        phone: driver.phone,
        message,
      }]);
    if (error) {
      console.error('Error adding SMS entry:', error);
    }
  };

  return { smsLog, addSms };
}

// ============================================================
// HOOK: useSupabaseSettings
// Manages the settings table (PINs, configurable values)
// ============================================================
function useSupabaseSettings() {
  const [settings, setSettingsState] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*');
      if (error) {
        console.error('Error loading settings:', error);
        if (mounted) setLoading(false);
        return;
      }
      if (mounted) {
        const map = {};
        (data || []).forEach(row => { map[row.key] = row.value; });
        setSettingsState(map);
        setLoading(false);
      }
    };
    load();

    // Realtime: when manager changes settings on one device, others update
    const channel = supabase
      .channel('settings-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'settings' },
        (payload) => {
          if (!mounted) return;
          if (payload.eventType === 'DELETE') {
            setSettingsState(prev => {
              const next = { ...prev };
              delete next[payload.old.key];
              return next;
            });
          } else {
            setSettingsState(prev => ({
              ...prev,
              [payload.new.key]: payload.new.value,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const updateSetting = async (key, value) => {
    const { error } = await supabase
      .from('settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    if (error) {
      console.error(`Error updating setting ${key}:`, error);
      return false;
    }
    return true;
  };

  return { settings, updateSetting, loading };
}

// ============================================================
// HOOK: useSupabaseSalesOrders
// Manages the valid_sales_orders table (replaces mock validation)
// ============================================================
function useSupabaseSalesOrders() {
  const [orders, setOrdersState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const { data, error } = await supabase
        .from('valid_sales_orders')
        .select('*')
        .order('number', { ascending: true });
      if (error) {
        console.error('Error loading sales orders:', error);
        if (mounted) setLoading(false);
        return;
      }
      if (mounted) {
        setOrdersState(data || []);
        setLoading(false);
      }
    };
    load();

    const channel = supabase
      .channel('sales-orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'valid_sales_orders' },
        (payload) => {
          if (!mounted) return;
          if (payload.eventType === 'INSERT') {
            setOrdersState(prev => {
              if (prev.some(o => o.number === payload.new.number)) return prev;
              return [...prev, payload.new].sort((a, b) => a.number.localeCompare(b.number));
            });
          } else if (payload.eventType === 'UPDATE') {
            setOrdersState(prev => prev.map(o => o.number === payload.new.number ? payload.new : o));
          } else if (payload.eventType === 'DELETE') {
            setOrdersState(prev => prev.filter(o => o.number !== payload.old.number));
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const addOrder = async (number) => {
    const trimmed = String(number).trim();
    if (!trimmed) return false;
    const { error } = await supabase
      .from('valid_sales_orders')
      .insert([{ number: trimmed, status: 'open' }]);
    if (error) {
      console.error('Error adding sales order:', error);
      return false;
    }
    return true;
  };

  const removeOrder = async (number) => {
    const { error } = await supabase
      .from('valid_sales_orders')
      .delete()
      .eq('number', number);
    if (error) {
      console.error('Error removing sales order:', error);
      return false;
    }
    return true;
  };

  // Check if a number is valid (for the kiosk form validation)
  const isValidOrder = (number) => {
    const trimmed = String(number).trim();
    return orders.some(o => o.number === trimmed);
  };

  return { orders, addOrder, removeOrder, isValidOrder, loading };
}

// (Legacy localStorage helpers kept for audit/sms — Parte 2 will migrate those)
const STORAGE_KEY_AUDIT = "producedock_audit";
const STORAGE_KEY_SMS = "producedock_sms";

function loadFromStorage(key, fallback) {
  try {
    const raw = window.localStorage?.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    window.localStorage?.setItem(key, JSON.stringify(value));
  } catch {}
}

function useSharedState(key, initialValue) {
  const [state, setState] = useState(() => loadFromStorage(key, initialValue));
  useEffect(() => {
    saveToStorage(key, state);
  }, [key, state]);
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key && e.newValue) {
        try { setState(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key]);
  return [state, setState];
}

// Simple route detection based on pathname
function useRoute() {
  const [route, setRoute] = useState(() => {
    if (typeof window === "undefined") return "manager";
    return window.location.pathname.includes("/checkin") ? "kiosk" : "manager";
  });
  useEffect(() => {
    const handler = () => {
      setRoute(window.location.pathname.includes("/checkin") ? "kiosk" : "manager");
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  return route;
}

// ============================================================
// SILO VALIDATION
// ============================================================
// Validates pickup numbers against the valid_sales_orders table in Supabase.
// (Future: replace with real Silo API call.)

async function validatePickupNumber(number) {
  const cleaned = number.trim().replace(/\D/g, "");
  if (!cleaned) return { valid: false, error: "Empty" };

  const { data, error } = await supabase
    .from('valid_sales_orders')
    .select('number, status')
    .eq('number', cleaned)
    .maybeSingle();

  if (error) {
    console.error('Error validating sales order:', error);
    return { valid: false, error: error.message };
  }

  return { valid: !!data };
}

// ============================================================
// STATUS CONFIG (labels are translated dynamically)
// ============================================================
const STATUS_CONFIG = {
  queued: { tKey: "statusQueued", color: "#f59e0b", bg: "#fef3c7", icon: "⏳" },
  assigned: { tKey: "statusAssigned", color: "#8b5cf6", bg: "#ede9fe", icon: "🚪" },
  loading: { tKey: "statusLoading", color: "#3b82f6", bg: "#dbeafe", icon: "📦" },
  ready: { tKey: "statusReady", color: "#10b981", bg: "#d1fae5", icon: "✓" },
  completed: { tKey: "statusCompleted", color: "#6b7280", bg: "#f3f4f6", icon: "✓" },
};

// Translated reason keys for override modal
const REASON_KEYS = ["reasonVIP", "reasonUrgent", "reasonError", "reasonOther"];

const initialForm = { firstName: "", lastName: "", idNumber: "", phone: "", company: "", plate: "", pickupNumber: "" };

// ============================================================
// HELPERS
// ============================================================
function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function minutesBetween(start, end = new Date()) {
  return Math.floor((end - new Date(start)) / 60000);
}

// Job Time: minutes from door assignment to now (or completion)
function getJobMinutes(driver) {
  if (!driver.assignedTime) return 0;
  const end = driver.completedTime ? new Date(driver.completedTime) : new Date();
  return Math.floor((end - new Date(driver.assignedTime)) / 60000);
}

// Wait Time: minutes from check-in to door assignment (or now if still waiting)
function getWaitMinutes(driver) {
  const end = driver.assignedTime ? new Date(driver.assignedTime) : new Date();
  return Math.floor((end - new Date(driver.checkinTime)) / 60000);
}

// Total time: check-in to completion
function getTotalMinutes(driver) {
  const end = driver.completedTime ? new Date(driver.completedTime) : new Date();
  return Math.floor((end - new Date(driver.checkinTime)) / 60000);
}

function formatElapsed(mins) {
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

// Color for Job Time (used in Dock Board with full alert system)
function getTimerColor(mins) {
  if (mins >= THRESHOLD_RED) return { color: "#dc2626", bg: "#fee2e2", border: "#fca5a5", labelKey: "statusDelayed" };
  if (mins >= THRESHOLD_YELLOW) return { color: "#d97706", bg: "#fef3c7", border: "#fcd34d", labelKey: "statusWarning" };
  return { color: "#16a34a", bg: "#dcfce7", border: "#86efac", labelKey: "statusOnTime" };
}

// Color for Wait Time (queue) - more strict, internal accountability
function getWaitColor(mins) {
  if (mins >= WAIT_THRESHOLD_RED) return { color: "#dc2626", bg: "#fee2e2", border: "#fca5a5" };
  if (mins >= WAIT_THRESHOLD_YELLOW) return { color: "#d97706", bg: "#fef3c7", border: "#fcd34d" };
  return { color: "#6b7280", bg: "#f3f4f6", border: "#d1d5db" };
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

// Tick every second so timers update live
function useTick(intervalMs = 1000) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
}

// Simple beep for alerts
function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.value = 0.1;
    osc.start();
    setTimeout(() => { osc.stop(); ctx.close(); }, 200);
  } catch (e) {}
}

// ============================================================
// PDF + ZIP REPORT GENERATION
// ============================================================
// Loads jsPDF and JSZip from CDN on demand (no package.json changes)
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function ensureLibsLoaded() {
  if (!window.jspdf) {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
  }
  if (!window.JSZip) {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
  }
}

function fmtTime(date) {
  if (!date) return "—";
  return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function fmtDate(date) {
  return new Date(date).toLocaleDateString([], { year: "numeric", month: "short", day: "2-digit" });
}

function safeFilename(s) {
  return String(s).replace(/[^a-zA-Z0-9-_]/g, "_").substring(0, 50);
}

// Generates a single PDF for one driver transaction
function generateDriverPDF(driver, lang) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 50;
  let y = margin;

  // Header (purple band - brand color)
  doc.setFillColor(61, 26, 91); // #3D1A5B - dark purple
  doc.rect(0, 0, pageW, 70, "F");
  doc.setTextColor(255, 217, 61); // #FFD93D - yellow accent
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Icon Produce", margin, 35);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255); // white
  doc.text(t(lang, "pdfTitle"), margin, 55);
  y = 100;

  // Order # + Date (right side)
  doc.setTextColor(31, 41, 55);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`${t(lang, "pdfOrder")}: ${driver.pickupNumber}`, pageW - margin, y - 30, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.text(`${t(lang, "pdfDate")}: ${fmtDate(driver.checkinTime)}`, pageW - margin, y - 15, { align: "right" });

  // Section: DRIVER
  drawSectionHeader(doc, t(lang, "pdfDriver"), margin, y);
  y += 24;
  drawField(doc, t(lang, "pdfName"), `${driver.firstName} ${driver.lastName}`, margin, y);
  y += 18;
  drawField(doc, t(lang, "pdfId"), driver.idNumber, margin, y);
  y += 18;
  drawField(doc, t(lang, "pdfPhone"), driver.phone, margin, y);
  y += 18;
  drawField(doc, t(lang, "pdfCompany"), driver.company, margin, y);
  y += 30;

  // Section: TRUCK
  drawSectionHeader(doc, t(lang, "pdfTruck"), margin, y);
  y += 24;
  drawField(doc, t(lang, "pdfPlate"), driver.plate, margin, y);
  y += 30;

  // Section: TIMES
  drawSectionHeader(doc, t(lang, "pdfTimes"), margin, y);
  y += 24;
  drawField(doc, t(lang, "pdfCheckIn"), fmtTime(driver.checkinTime), margin, y);
  y += 18;
  drawField(doc, `${t(lang, "pdfDoorAssigned")} (${t(lang, "pdfDoor")} ${driver.door || "—"})`, fmtTime(driver.assignedTime), margin, y);
  y += 18;
  drawField(doc, t(lang, "pdfCompleted"), fmtTime(driver.completedTime), margin, y);
  y += 24;
  // Time breakdown
  const waitMins = driver.assignedTime ? Math.floor((new Date(driver.assignedTime) - new Date(driver.checkinTime)) / 60000) : 0;
  const jobMins = (driver.assignedTime && driver.completedTime) ? Math.floor((new Date(driver.completedTime) - new Date(driver.assignedTime)) / 60000) : 0;
  const totalMins = driver.completedTime ? Math.floor((new Date(driver.completedTime) - new Date(driver.checkinTime)) / 60000) : 0;
  drawField(doc, t(lang, "pdfWaitTime"), formatElapsed(waitMins), margin, y);
  y += 18;
  drawField(doc, t(lang, "pdfJobTime"), formatElapsed(jobMins), margin, y);
  y += 18;
  doc.setFont("helvetica", "bold");
  drawField(doc, t(lang, "pdfTotalTime"), formatElapsed(totalMins), margin, y);
  doc.setFont("helvetica", "normal");
  y += 18;
  if (driver.palletCount) {
    drawField(doc, t(lang, "pdfPallets"), String(driver.palletCount), margin, y);
    y += 18;
  }
  y += 12;

  // Selfie (if exists)
  if (driver.selfie) {
    if (y > 600) { doc.addPage(); y = margin; }
    drawSectionHeader(doc, t(lang, "pdfSelfie"), margin, y);
    y += 20;
    try {
      doc.addImage(driver.selfie, "JPEG", margin, y, 120, 120);
    } catch (e) { /* skip if invalid */ }
  }

  // Signature (if exists) — to the right of selfie
  if (driver.signature) {
    if (driver.selfie) {
      // Same row, right side
      drawSectionHeader(doc, t(lang, "pdfSignature"), margin + 180, y - 20);
      try {
        doc.addImage(driver.signature, "PNG", margin + 180, y, 240, 90);
      } catch (e) {}
    } else {
      if (y > 600) { doc.addPage(); y = margin; }
      drawSectionHeader(doc, t(lang, "pdfSignature"), margin, y);
      y += 20;
      try {
        doc.addImage(driver.signature, "PNG", margin, y, 240, 90);
      } catch (e) {}
    }
  }
  if (driver.selfie || driver.signature) y += 130;

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 30;
  doc.setFontSize(9);
  doc.setTextColor(156, 163, 175);
  doc.text(t(lang, "pdfFooter"), pageW / 2, footerY, { align: "center" });

  return doc.output("blob");
}

function drawSectionHeader(doc, title, x, y) {
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(91, 44, 139); // #5B2C8B brand purple
  doc.text(title, x, y);
  doc.setDrawColor(255, 217, 61); // #FFD93D yellow underline
  doc.setLineWidth(1.5);
  doc.line(x, y + 4, x + 200, y + 4);
  doc.setTextColor(31, 41, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
}

function drawField(doc, label, value, x, y) {
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text(`${label}:`, x, y);
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  doc.text(String(value || "—"), x + 130, y);
}

// Generates a CSV summary of the day
function generateSummaryCSV(drivers, lang) {
  const headers = [
    "Order#", "Driver", "Company", "Phone", "ID", "Plate",
    "Door", "CheckIn", "Assigned", "Completed", "WaitMinutes", "LoadingMinutes", "TotalMinutes", "Pallets", "Status",
  ];
  const rows = drivers.map(d => {
    const waitMins = d.assignedTime ? Math.floor((new Date(d.assignedTime) - new Date(d.checkinTime)) / 60000) : "";
    const jobMins = (d.assignedTime && d.completedTime) ? Math.floor((new Date(d.completedTime) - new Date(d.assignedTime)) / 60000) : "";
    const totalMins = d.completedTime ? Math.floor((new Date(d.completedTime) - new Date(d.checkinTime)) / 60000) : "";
    return [
      d.pickupNumber,
      `${d.firstName} ${d.lastName}`,
      d.company,
      d.phone,
      d.idNumber,
      d.plate,
      d.door || "",
      fmtTime(d.checkinTime),
      fmtTime(d.assignedTime),
      fmtTime(d.completedTime),
      waitMins,
      jobMins,
      totalMins,
      d.palletCount || "",
      d.status,
    ];
  });
  const csv = [headers, ...rows].map(row =>
    row.map(cell => {
      const s = String(cell ?? "");
      return s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(",")
  ).join("\n");
  return csv;
}

// Main: generate all PDFs + CSV, zip them, trigger download
async function generateDayCloseReport(drivers, lang) {
  await ensureLibsLoaded();
  const zip = new window.JSZip();
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10); // YYYY-MM-DD

  // Add CSV summary
  zip.file(`summary-${dateStr}.csv`, generateSummaryCSV(drivers, lang));

  // Add one PDF per driver
  for (const d of drivers) {
    const pdfBlob = generateDriverPDF(d, lang);
    const fname = `driver-${safeFilename(d.firstName + "-" + d.lastName)}-${d.pickupNumber}.pdf`;
    zip.file(fname, pdfBlob);
  }

  // Generate ZIP and trigger download
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `producedock-${dateStr}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ============================================================
// CAMERA
// ============================================================
function CameraCapture({ onCapture, onClose, lang }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState("");
  const [facingMode, setFacingMode] = useState("user");

  useEffect(() => {
    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width: { ideal: 720 }, height: { ideal: 720 } },
          audio: false,
        });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        setError(t(lang, "camDenied"));
      }
    }
    startCamera();
    return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
  }, [facingMode]);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d");
    const sx = (video.videoWidth - size) / 2;
    const sy = (video.videoHeight - size) / 2;
    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    if (stream) stream.getTracks().forEach(t => t.stop());
    onCapture(dataUrl);
  };

  const close = () => {
    if (stream) stream.getTracks().forEach(t => t.stop());
    onClose();
  };

  return (
    <div style={S.modalOverlay}>
      <div style={{ ...S.modal, width: 500 }}>
        <div style={S.modalHeader}>
          <span style={S.modalIcon}>📸</span>
          <div>
            <div style={S.modalTitle}>{t(lang, "camTitle")}</div>
            <div style={S.modalSub}>{t(lang, "camSub")}</div>
          </div>
          <button onClick={close} style={S.closeBtn}>✕</button>
        </div>
        {error ? <div style={S.pickupError}>{error}</div> : (
          <>
            <div style={S.cameraWrap}>
              <video ref={videoRef} autoPlay playsInline muted style={S.video} />
              <div style={S.cameraOval} />
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div style={S.modalFooter}>
              <button onClick={() => setFacingMode(f => f === "user" ? "environment" : "user")} style={S.cancelBtn}>{t(lang, "camFlip")}</button>
              <button onClick={close} style={S.cancelBtn}>{t(lang, "cancel")}</button>
              <button onClick={capture} style={S.sendBtn}>{t(lang, "camCapture")}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SIGNATURE PAD
// ============================================================
function SignaturePad({ onSave, onClose, lang }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const touch = e.touches?.[0];
    const clientX = touch?.clientX ?? e.clientX;
    const clientY = touch?.clientY ?? e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const start = (e) => { e.preventDefault(); setDrawing(true); setHasSigned(true); const { x, y } = getPos(e); const ctx = canvasRef.current.getContext("2d"); ctx.beginPath(); ctx.moveTo(x, y); };
  const move = (e) => { if (!drawing) return; e.preventDefault(); const { x, y } = getPos(e); const ctx = canvasRef.current.getContext("2d"); ctx.lineTo(x, y); ctx.stroke(); };
  const end = () => setDrawing(false);
  const clear = () => { const canvas = canvasRef.current; const ctx = canvas.getContext("2d"); ctx.fillStyle = "white"; ctx.fillRect(0, 0, canvas.width, canvas.height); setHasSigned(false); };
  const save = () => onSave(canvasRef.current.toDataURL("image/png"));

  return (
    <div style={S.modalOverlay}>
      <div style={{ ...S.modal, width: 520 }}>
        <div style={S.modalHeader}>
          <span style={S.modalIcon}>✍️</span>
          <div>
            <div style={S.modalTitle}>{t(lang, "sigTitle")}</div>
            <div style={S.modalSub}>{t(lang, "sigSub")}</div>
          </div>
          <button onClick={onClose} style={S.closeBtn}>✕</button>
        </div>
        <div style={S.signaturePadWrap}>
          <canvas ref={canvasRef} width={800} height={300} style={S.signatureCanvas}
            onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
            onTouchStart={start} onTouchMove={move} onTouchEnd={end} />
        </div>
        <div style={S.modalFooter}>
          <button onClick={clear} style={S.cancelBtn}>{t(lang, "sigClear")}</button>
          <button onClick={onClose} style={S.cancelBtn}>{t(lang, "cancel")}</button>
          <button onClick={save} disabled={!hasSigned} style={{ ...S.sendBtn, opacity: hasSigned ? 1 : 0.4 }}>{t(lang, "sigSave")}</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MANAGER PIN MODAL
// ============================================================
function ManagerPinModal({ title, subtitle, onSuccess, onClose, lang, managerPin = MANAGER_PIN_DEFAULT }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    if (pin === managerPin) { setError(""); onSuccess(); }
    else { setError(t(lang, "pinIncorrect")); setPin(""); }
  };

  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={{ ...S.modal, width: 380 }} onClick={e => e.stopPropagation()}>
        <div style={S.modalHeader}>
          <span style={S.modalIcon}>🔒</span>
          <div>
            <div style={S.modalTitle}>{title}</div>
            <div style={S.modalSub}>{subtitle}</div>
          </div>
          <button onClick={onClose} style={S.closeBtn}>✕</button>
        </div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>
          {t(lang, "pinPrompt")}
        </div>
        <input ref={inputRef} type="password" inputMode="numeric" pattern="[0-9]*"
          maxLength={4} value={pin}
          onChange={e => setPin(e.target.value.replace(/\D/g, ""))}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder="••••"
          style={{ ...S.input, fontSize: 28, letterSpacing: 12, textAlign: "center", fontWeight: 800, padding: "16px 12px" }} />
        {error && <div style={{ ...S.error, fontSize: 13, textAlign: "center", marginTop: 8 }}>{error}</div>}
        <div style={S.modalFooter}>
          <button onClick={onClose} style={S.cancelBtn}>{t(lang, "cancel")}</button>
          <button onClick={submit} disabled={pin.length !== 4} style={{ ...S.sendBtn, opacity: pin.length === 4 ? 1 : 0.4 }}>
            {t(lang, "pinUnlock")}
          </button>
        </div>
        <div style={{ fontSize: 10, color: "#9ca3af", textAlign: "center", marginTop: 10, fontStyle: "italic" }}>
          {t(lang, "pinDemoHint")}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// OVERRIDE REASON MODAL
// ============================================================
function OverrideReasonModal({ action, driver, onConfirm, onClose, lang }) {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={{ ...S.modal, width: 440 }} onClick={e => e.stopPropagation()}>
        <div style={S.modalHeader}>
          <span style={S.modalIcon}>⚠️</span>
          <div>
            <div style={S.modalTitle}>{t(lang, "overrideTitle")}</div>
            <div style={S.modalSub}>{t(lang, "overrideSub", { action, name: `${driver.firstName} ${driver.lastName}` })}</div>
          </div>
          <button onClick={onClose} style={S.closeBtn}>✕</button>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {t(lang, "overrideSelectReason")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {REASON_KEYS.map(rKey => {
            const label = t(lang, rKey);
            return (
              <button key={rKey} onClick={() => setReason(label)}
                style={{ padding: "12px 14px", textAlign: "left", border: reason === label ? "2px solid #5B2C8B" : "1.5px solid #d1d5db",
                  background: reason === label ? "#FFFCEB" : "white", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#374151" }}>
                {reason === label ? "● " : "○ "}{label}
              </button>
            );
          })}
        </div>
        {reason === t(lang, "reasonOther") && (
          <input placeholder={t(lang, "overrideOtherPlaceholder")} value={note} onChange={e => setNote(e.target.value)} style={S.input} />
        )}
        <div style={S.modalFooter}>
          <button onClick={onClose} style={S.cancelBtn}>{t(lang, "cancel")}</button>
          <button onClick={() => onConfirm(reason + (note ? `: ${note}` : ""))}
            disabled={!reason || (reason === t(lang, "reasonOther") && !note.trim())}
            style={{ ...S.sendBtn, opacity: (!reason || (reason === t(lang, "reasonOther") && !note.trim())) ? 0.4 : 1 }}>
            {t(lang, "overrideConfirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CHECK-IN FORM
// ============================================================
function Field({ label, fieldName, placeholder, required, value, onChange, error, inputMode }) {
  return (
    <div style={S.field}>
      <label style={S.label}>{label} {required && <span style={{ color: "#dc2626" }}>*</span>}</label>
      <input placeholder={placeholder} value={value} inputMode={inputMode}
        onChange={e => onChange(fieldName, e.target.value)}
        style={{ ...S.input, ...(error ? S.inputError : {}) }} />
      {error && <span style={S.error}>{error}</span>}
    </div>
  );
}

function CheckInForm({ onSubmit, isMobile, driverHistory, lang, initialData }) {
  const [form, setForm] = useState(() => initialData ? { ...initialForm, ...initialData } : initialForm);
  const [errors, setErrors] = useState({});
  const [pickupValidation, setPickupValidation] = useState(() => initialData?.pickupNumber ? { valid: true } : null);
  const [selfie, setSelfie] = useState(initialData?.selfie || null);
  const [signature, setSignature] = useState(initialData?.signature || null);
  const [consent, setConsent] = useState(!!initialData);
  const [showCamera, setShowCamera] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const existingDriver = form.idNumber.trim() ? driverHistory[form.idNumber.trim().toUpperCase()] : null;
  const isFirstTime = form.idNumber.trim() && !existingDriver;

  useEffect(() => {
    if (existingDriver) {
      setForm(f => ({ ...f, firstName: existingDriver.firstName, lastName: existingDriver.lastName, phone: existingDriver.phone, company: existingDriver.company }));
    }
  }, [existingDriver]);

  const set = (field, value) => {
    if (field === "phone") value = formatPhone(value);
    if (field === "idNumber") value = value.toUpperCase();
    if (field === "pickupNumber") value = value.replace(/\D/g, "").slice(0, 10);
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: "" }));
    if (field === "pickupNumber") {
      const cleaned = value.trim();
      if (!cleaned || cleaned.length < 4) { setPickupValidation(null); return; }
      setPickupValidation({ loading: true });
      validatePickupNumber(cleaned).then(result => {
        setForm(currentForm => {
          if (currentForm.pickupNumber === cleaned) setPickupValidation(result);
          return currentForm;
        });
      });
    }
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = t(lang, "fieldRequired");
    if (!form.lastName.trim()) e.lastName = t(lang, "fieldRequired");
    if (!form.idNumber.trim()) e.idNumber = t(lang, "fieldRequired");
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = t(lang, "fieldPhoneInvalid");
    if (!form.plate.trim()) e.plate = t(lang, "fieldRequired");
    if (!form.pickupNumber.trim()) e.pickupNumber = t(lang, "formPickupRequired");
    else if (!pickupValidation?.valid) e.pickupNumber = t(lang, "formPickupBlocked");
    if (isFirstTime) {
      if (!consent) e.consent = t(lang, "consentRequired");
      if (!selfie) e.selfie = t(lang, "selfieRequired");
      if (!signature) e.signature = t(lang, "signatureRequired");
    }
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
    setTimeout(() => {
      onSubmit({
        ...form, status: "queued", door: null,
        checkinTime: new Date().toISOString(), assignedTime: null, completedTime: null,
        selfie: selfie || existingDriver?.selfie,
        signature: signature || existingDriver?.signature,
        isReturning: !!existingDriver,
      });
      setForm(initialForm); setPickupValidation(null); setSelfie(null); setSignature(null); setConsent(false); setSubmitted(false);
    }, 700);
  };

  return (
    <>
      <div style={S.formCard}>
        <div style={S.formHeader}>
          <div style={S.formIcon}>🚛</div>
          <div>
            <div style={S.formTitle}>{t(lang, "formTitle")}</div>
            <div style={S.formSub}>{t(lang, "formSub")}</div>
          </div>
        </div>

        <div style={S.pickupBox}>
          <div style={S.pickupLabel}>{t(lang, "formPickupLabel")} <span style={{ color: "#dc2626" }}>*</span></div>
          <div style={S.pickupSub}>{t(lang, "formPickupSub")}</div>
          <input placeholder={t(lang, "formPickupPlaceholder")} value={form.pickupNumber}
            inputMode="numeric" pattern="[0-9]*"
            onChange={e => set("pickupNumber", e.target.value)}
            style={{ ...S.pickupInput,
              ...(pickupValidation?.valid === true ? S.pickupInputValid : {}),
              ...(pickupValidation?.valid === false || errors.pickupNumber ? S.pickupInputInvalid : {}),
              ...(pickupValidation?.loading ? S.pickupInputLoading : {}) }} />
          {pickupValidation?.loading && <div style={S.pickupLoading}>{t(lang, "formPickupChecking")}</div>}
          {pickupValidation?.valid === true && (
            <div style={S.pickupMatch}>
              <div style={{ fontWeight: 800, color: "#5B2C8B", fontSize: 15 }}>✓ {t(lang, "formPickupValid", { n: form.pickupNumber })}</div>
              <div style={{ fontSize: 12, color: "#3D1A5B", marginTop: 4 }}>{t(lang, "formPickupValidSub")}</div>
            </div>
          )}
          {pickupValidation?.valid === false && (
            <div style={S.pickupError}>
              {t(lang, "formPickupNotFound", { n: form.pickupNumber })}<br />
              <span style={{ fontWeight: 400, fontSize: 12 }}>{t(lang, "formPickupNotFoundSub")}</span>
            </div>
          )}
          {errors.pickupNumber && !pickupValidation && <span style={{ ...S.error, fontSize: 13, marginTop: 8 }}>{errors.pickupNumber}</span>}
          <div style={S.demoHint}>{t(lang, "formDemoNumbers")}</div>
        </div>

        <div style={S.sectionLabel}>{t(lang, "sectionDriverInfo")}</div>
        <Field label={t(lang, "fieldIdNumber")} fieldName="idNumber" placeholder="DL-123456" required value={form.idNumber} onChange={set} error={errors.idNumber} />
        {existingDriver && <div style={S.returningBanner}>{t(lang, "welcomeBack", { name: existingDriver.firstName })}</div>}
        {isFirstTime && form.idNumber.length >= 4 && <div style={S.firstTimeBanner}>{t(lang, "firstTimeDetected")}</div>}

        <div style={isMobile ? S.grid1 : S.grid2}>
          <Field label={t(lang, "fieldFirstName")} fieldName="firstName" placeholder="John" required value={form.firstName} onChange={set} error={errors.firstName} />
          <Field label={t(lang, "fieldLastName")} fieldName="lastName" placeholder="Smith" required value={form.lastName} onChange={set} error={errors.lastName} />
        </div>
        <div style={isMobile ? S.grid1 : S.grid2}>
          <Field label={t(lang, "fieldPhone")} fieldName="phone" placeholder="(555) 000-0000" required value={form.phone} onChange={set} error={errors.phone} />
          <Field label={t(lang, "fieldCompany")} fieldName="company" placeholder="ABC Transport" value={form.company} onChange={set} error={errors.company} />
        </div>

        <div style={S.sectionLabel}>{t(lang, "sectionTruckInfo")}</div>
        <Field label={t(lang, "fieldPlate")} fieldName="plate" placeholder="ABC-1234" required value={form.plate} onChange={set} error={errors.plate} />

        {isFirstTime && (
          <>
            <div style={S.sectionLabel}>{t(lang, "sectionVerification")}</div>
            <div style={S.consentBox}>
              <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ marginTop: 4, width: 18, height: 18 }} />
                <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
                  {t(lang, "consentText")}
                </span>
              </label>
              {errors.consent && <span style={{ ...S.error, marginTop: 6 }}>{errors.consent}</span>}
            </div>
            <div style={isMobile ? S.grid1 : S.grid2}>
              <div style={S.captureCard}>
                <div style={S.captureLabel}>{t(lang, "selfieLabel")} <span style={{ color: "#dc2626" }}>*</span></div>
                {selfie ? (
                  <div><img src={selfie} alt="" style={S.selfieImg} /><button onClick={() => setSelfie(null)} style={S.retakeBtn}>{t(lang, "selfieRetake")}</button></div>
                ) : (
                  <button onClick={() => consent ? setShowCamera(true) : setErrors(e => ({ ...e, consent: t(lang, "consentFirst") }))} style={S.captureBtn}>{t(lang, "selfieTake")}</button>
                )}
                {errors.selfie && <span style={S.error}>{errors.selfie}</span>}
              </div>
              <div style={S.captureCard}>
                <div style={S.captureLabel}>{t(lang, "signatureLabel")} <span style={{ color: "#dc2626" }}>*</span></div>
                {signature ? (
                  <div><img src={signature} alt="" style={S.signatureImg} /><button onClick={() => setSignature(null)} style={S.retakeBtn}>{t(lang, "signatureRedo")}</button></div>
                ) : (
                  <button onClick={() => consent ? setShowSignature(true) : setErrors(e => ({ ...e, consent: t(lang, "consentFirst") }))} style={S.captureBtn}>{t(lang, "signatureSign")}</button>
                )}
                {errors.signature && <span style={S.error}>{errors.signature}</span>}
              </div>
            </div>
          </>
        )}

        <div style={S.infoBox}>
          {t(lang, "formInfoBox")}
        </div>

        <button onClick={handleSubmit} disabled={submitted} style={{ ...S.submitBtn, opacity: submitted ? 0.7 : 1, cursor: submitted ? "wait" : "pointer" }}>
          {submitted ? t(lang, "formSubmitted") : t(lang, "formSubmit")}
        </button>
      </div>

      {showCamera && <CameraCapture lang={lang} onCapture={(img) => { setSelfie(img); setShowCamera(false); }} onClose={() => setShowCamera(false)} />}
      {showSignature && <SignaturePad lang={lang} onSave={(img) => { setSignature(img); setShowSignature(false); }} onClose={() => setShowSignature(false)} />}
    </>
  );
}

// ============================================================
// LIVE TIMER COMPONENT
// ============================================================
function LiveTimer({ startTime, large = false }) {
  useTick(5000); // update every 5 seconds
  const mins = Math.floor((new Date() - new Date(startTime)) / 60000);
  const color = getTimerColor(mins);
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: large ? "6px 14px" : "3px 10px",
      background: color.bg, color: color.color, border: `1.5px solid ${color.border}`,
      borderRadius: 20, fontWeight: 800, fontSize: large ? 14 : 12,
      fontVariantNumeric: "tabular-nums",
    }}>
      ⏱ {formatElapsed(mins)}
    </div>
  );
}

// Wait Time timer (different thresholds, less aggressive)
function WaitTimer({ startTime, label }) {
  useTick(5000);
  const mins = Math.floor((new Date() - new Date(startTime)) / 60000);
  const color = getWaitColor(mins);
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "3px 10px",
      background: color.bg, color: color.color, border: `1.5px solid ${color.border}`,
      borderRadius: 20, fontWeight: 700, fontSize: 12,
      fontVariantNumeric: "tabular-nums",
    }}>
      ⏳ {formatElapsed(mins)} {label || ""}
    </div>
  );
}

// ============================================================
// DOCK BOARD (dashboard center)
// ============================================================
function DockBoard({ drivers, onDoorClick, isMobile, lang }) {
  useTick(5000);
  const activeByDoor = {};
  drivers.forEach(d => {
    if (d.door && d.status !== "completed") activeByDoor[d.door] = d;
  });

  return (
    <div style={S.dockBoard}>
      <div style={S.dockBoardTitle}>{t(lang, "dockTitle")}</div>
      <div style={{ ...S.dockGrid, gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)" }}>
        {DOORS.map(d => {
          const driver = activeByDoor[d];
          if (!driver) {
            return (
              <div key={d} style={{ ...S.dockCell, ...S.dockCellEmpty }} onClick={() => onDoorClick(d, null)}>
                <div style={S.dockNum}>{d}</div>
                <div style={S.dockEmptyLabel}>{t(lang, "dockEmpty")}</div>
              </div>
            );
          }
          // JOB TIME: from door assignment to now (this is what gets the alert colors)
          const mins = getJobMinutes(driver);
          const color = getTimerColor(mins);
          const statusCfg = STATUS_CONFIG[driver.status];
          return (
            <div key={d} onClick={() => onDoorClick(d, driver)}
              style={{ ...S.dockCell, background: color.bg, borderColor: color.border, cursor: "pointer" }}>
              <div style={{ ...S.dockNum, color: color.color }}>{d}</div>
              <div style={{ fontSize: 9, fontWeight: 800, color: color.color, letterSpacing: 0.5 }}>{t(lang, color.labelKey)}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: color.color, marginTop: 2 }}>{formatElapsed(mins)}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#374151", marginTop: 4, textAlign: "center", lineHeight: 1.2, wordBreak: "break-word" }}>
                {driver.firstName} {driver.lastName[0]}.
              </div>
              <div style={{ fontSize: 9, color: statusCfg.color, marginTop: 2, fontWeight: 700 }}>{statusCfg.icon} {t(lang, statusCfg.tKey)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// QUEUE LIST (waiting to be assigned)
// ============================================================
function QueueList({ queuedDrivers, onManualAssign, availableDoors, lang }) {
  useTick(5000);
  if (queuedDrivers.length === 0) {
    return (
      <div style={S.emptyQueue}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
        <div style={{ fontWeight: 700, color: "#5B2C8B" }}>{t(lang, "queueEmpty")}</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{t(lang, "queueEmptySub")}</div>
      </div>
    );
  }
  return (
    <div>
      {queuedDrivers.map((driver, idx) => {
        // WAIT TIME: time waiting in queue (uses different thresholds)
        const mins = getWaitMinutes(driver);
        const color = getWaitColor(mins);
        const noDoorsAvailable = availableDoors.length === 0;
        return (
          <div key={driver.id} style={{ ...S.queueItem, borderLeftColor: color.color }}>
            <div style={S.queuePosition}>#{idx + 1}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{driver.firstName} {driver.lastName}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                SO #{driver.pickupNumber} · {driver.company} · {driver.plate}
              </div>
              <div style={{ marginTop: 6 }}><WaitTimer startTime={driver.checkinTime} label={t(lang, "waitTime")} /></div>
            </div>
            <button
              onClick={() => onManualAssign(driver)}
              disabled={noDoorsAvailable}
              style={{ ...S.assignDoorBtn, opacity: noDoorsAvailable ? 0.4 : 1, cursor: noDoorsAvailable ? "not-allowed" : "pointer" }}>
              🚪 {t(lang, "queueAssignDoor")}
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// DOOR ASSIGN MODAL (manager override)
// ============================================================
function ManualAssignModal({ driver, onClose, onAssign, occupiedDoors, lang }) {
  const [selected, setSelected] = useState("");
  const [pallets, setPallets] = useState(driver.palletCount ? String(driver.palletCount) : "");
  const [palletError, setPalletError] = useState("");
  const taken = new Set(occupiedDoors);

  const handleAssign = () => {
    const palletNum = parseInt(pallets, 10);
    if (!pallets.trim() || isNaN(palletNum) || palletNum < 1) {
      setPalletError(t(lang, "palletCountRequired"));
      return;
    }
    if (!selected) return;
    onAssign(selected, palletNum);
    onClose();
  };

  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={S.modalHeader}>
          <span style={S.modalIcon}>🔓</span>
          <div>
            <div style={S.modalTitle}>{t(lang, "manualTitle")}</div>
            <div style={S.modalSub}>{driver.firstName} {driver.lastName} · SO #{driver.pickupNumber}</div>
          </div>
          <button onClick={onClose} style={S.closeBtn}>✕</button>
        </div>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", padding: 10, borderRadius: 8, fontSize: 12, color: "#92400e", marginBottom: 12 }}>
          {t(lang, "manualWarning")}
        </div>

        {/* Pallet count field */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#3D1A5B", marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" }}>
            📦 {t(lang, "palletCountLabel")} <span style={{ color: "#dc2626" }}>*</span>
          </label>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6 }}>{t(lang, "palletCountSub")}</div>
          <input
            type="number" min="1" inputMode="numeric"
            value={pallets}
            onChange={e => { setPallets(e.target.value); setPalletError(""); }}
            placeholder={t(lang, "palletCountPlaceholder")}
            style={{ ...S.input, fontSize: 18, fontWeight: 700, ...(palletError ? S.inputError : {}) }}
          />
          {palletError && <span style={S.error}>{palletError}</span>}
        </div>

        <div style={{ fontSize: 12, fontWeight: 800, color: "#3D1A5B", marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase" }}>
          🚪 {lang === "es" ? "Seleccionar Puerta" : "Select Door"} <span style={{ color: "#dc2626" }}>*</span>
        </div>
        <div style={S.doorGrid}>
          {DOORS.map(d => {
            const isTaken = taken.has(d);
            const isSelected = selected === d;
            return (
              <button key={d} onClick={() => !isTaken && setSelected(d)} disabled={isTaken}
                style={{ ...S.doorBtn, ...(isSelected ? S.doorBtnActive : {}), ...(isTaken ? S.doorBtnTaken : {}) }}>
                {d}{isTaken && <div style={S.doorTakenLabel}>{t(lang, "manualBusy")}</div>}
              </button>
            );
          })}
        </div>
        <div style={S.modalFooter}>
          <button onClick={onClose} style={S.cancelBtn}>{t(lang, "cancel")}</button>
          <button onClick={handleAssign}
            disabled={!selected || !pallets.trim()} style={{ ...S.sendBtn, opacity: (selected && pallets.trim()) ? 1 : 0.4 }}>
            {t(lang, "manualAssignBtn", { door: selected })}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DRIVER DETAIL MODAL (open from dock)
// ============================================================
function DriverDetailModal({ driver, onClose, onStatusChange, onSMS, onViewIdentity, lang }) {
  useTick(5000);
  const cfg = STATUS_CONFIG[driver.status];
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);

  const handleStatusClick = (status) => {
    if (status === "completed") {
      // Ask for confirmation before completing
      setShowCompleteConfirm(true);
    } else if (status === "ready") {
      // Toggle: if already ready, go back to loading; else mark as ready
      if (driver.status === "ready") {
        onStatusChange(driver.id, "loading");
      } else {
        onStatusChange(driver.id, "ready");
      }
    } else {
      onStatusChange(driver.id, status);
    }
  };

  const handleConfirmComplete = () => {
    onStatusChange(driver.id, "completed");
    setShowCompleteConfirm(false);
    onClose(); // Close the driver modal automatically
  };

  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={S.modalHeader}>
          <span style={S.modalIcon}>🚛</span>
          <div>
            <div style={S.modalTitle}>{driver.firstName} {driver.lastName}</div>
            <div style={S.modalSub}>{t(lang, "queueDoor")} {driver.door} · SO #{driver.pickupNumber}</div>
          </div>
          <button onClick={onClose} style={S.closeBtn}>✕</button>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
          {driver.assignedTime ? (
            <LiveTimer startTime={driver.assignedTime} large />
          ) : (
            <WaitTimer startTime={driver.checkinTime} label={t(lang, "waitTime")} />
          )}
          <span style={{ ...S.statusBadge, color: cfg.color, background: cfg.bg }}>{cfg.icon} {t(lang, cfg.tKey)}</span>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.8, color: "#374151" }}>
          <div><b>{t(lang, "detailCompany")}:</b> {driver.company}</div>
          <div><b>{t(lang, "detailTruck")}:</b> {driver.plate}</div>
          <div><b>{t(lang, "detailPhone")}:</b> {driver.phone}</div>
          <div><b>{t(lang, "detailId")}:</b> <MaskedId value={driver.idNumber} lang={lang} /></div>
          {driver.palletCount && <div><b>📦 {t(lang, "completedPallets")}:</b> {driver.palletCount}</div>}
          <div><b>{t(lang, "detailCheckedIn")}:</b> {new Date(driver.checkinTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
        </div>
        <div style={{ ...S.sectionLabel, marginTop: 16 }}>{t(lang, "detailUpdateStatus")}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["assigned", "loading", "ready", "completed"].map(s => {
            const isActive = driver.status === s;
            // Special styling for "ready" — bright green when active (toggle)
            const isReadyActive = s === "ready" && isActive;
            return (
              <button key={s} onClick={() => handleStatusClick(s)}
                style={{
                  padding: "8px 14px",
                  border: isReadyActive ? "2px solid #16a34a" : (isActive ? `2px solid ${STATUS_CONFIG[s].color}` : "1.5px solid #d1d5db"),
                  background: isReadyActive ? "#16a34a" : (isActive ? STATUS_CONFIG[s].bg : "white"),
                  color: isReadyActive ? "white" : (isActive ? STATUS_CONFIG[s].color : "#374151"),
                  borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 800,
                  boxShadow: isReadyActive ? "0 2px 8px rgba(22, 163, 74, 0.3)" : "none",
                  transition: "all 0.2s ease",
                }}>
                {STATUS_CONFIG[s].icon} {t(lang, STATUS_CONFIG[s].tKey)}
                {isReadyActive && <span style={{ marginLeft: 4 }}>✓</span>}
              </button>
            );
          })}
        </div>
        <div style={S.modalFooter}>
          {(driver.selfie || driver.signature) && (
            <button onClick={() => onViewIdentity(driver)} style={S.cancelBtn}>{t(lang, "detailViewId")}</button>
          )}
          <button onClick={() => onSMS(driver)} style={S.sendBtn}>{t(lang, "detailSendSMS")}</button>
        </div>
      </div>

      {/* Confirmation modal for completed status */}
      {showCompleteConfirm && (
        <div style={{ ...S.modalOverlay, zIndex: 1100 }} onClick={(e) => { e.stopPropagation(); setShowCompleteConfirm(false); }}>
          <div style={{ ...S.modal, width: 400 }} onClick={e => e.stopPropagation()}>
            <div style={S.modalHeader}>
              <span style={S.modalIcon}>✅</span>
              <div>
                <div style={S.modalTitle}>{t(lang, "completeConfirmTitle")}</div>
              </div>
              <button onClick={() => setShowCompleteConfirm(false)} style={S.closeBtn}>✕</button>
            </div>
            <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.6, marginBottom: 8 }}>
              {t(lang, "completeConfirmMsg", { name: `${driver.firstName} ${driver.lastName}` })}
            </div>
            <div style={S.modalFooter}>
              <button onClick={() => setShowCompleteConfirm(false)} style={S.cancelBtn}>{t(lang, "cancel")}</button>
              <button onClick={handleConfirmComplete} style={{ ...S.sendBtn, background: "#16a34a" }}>
                ✓ {t(lang, "completeConfirmBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// IDENTITY MODAL
// ============================================================
function IdentityModal({ driver, onClose, lang }) {
  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={S.modalHeader}>
          <span style={S.modalIcon}>🪪</span>
          <div>
            <div style={S.modalTitle}>{t(lang, "identityTitle")}</div>
            <div style={S.modalSub}>{driver.firstName} {driver.lastName} · <MaskedId value={driver.idNumber} lang={lang} inline /></div>
          </div>
          <button onClick={onClose} style={S.closeBtn}>✕</button>
        </div>
        {driver.selfie && <div style={{ marginBottom: 16 }}><div style={S.captureLabel}>{t(lang, "identitySelfie")}</div><img src={driver.selfie} alt="" style={{ width: "100%", borderRadius: 10, marginTop: 8 }} /></div>}
        {driver.signature && <div><div style={S.captureLabel}>{t(lang, "identitySignature")}</div><img src={driver.signature} alt="" style={{ width: "100%", background: "white", borderRadius: 10, marginTop: 8, border: "1px solid #e5e7eb" }} /></div>}
      </div>
    </div>
  );
}

// ============================================================
// SMS MODAL
// ============================================================
function SMSModal({ driver, onClose, onSend, lang }) {
  const defaultMsg = driver.status === "ready"
    ? t(lang, "smsTemplateReady", { name: driver.firstName, door: driver.door })
    : t(lang, "smsTemplateAssigned", { name: driver.firstName, door: driver.door, order: driver.pickupNumber });
  const [message, setMessage] = useState(defaultMsg);
  const [sent, setSent] = useState(false);
  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={S.modalHeader}>
          <span style={S.modalIcon}>📱</span>
          <div>
            <div style={S.modalTitle}>{t(lang, "smsTitle")}</div>
            <div style={S.modalSub}>{t(lang, "smsTo")}: {driver.firstName} · {driver.phone}</div>
          </div>
          <button onClick={onClose} style={S.closeBtn}>✕</button>
        </div>
        <textarea value={message} onChange={e => setMessage(e.target.value)} style={S.smsTextarea} rows={5} />
        <div style={S.charCount}>{t(lang, "smsCharCount", { n: message.length })}</div>
        <div style={S.modalFooter}>
          <button onClick={onClose} style={S.cancelBtn}>{t(lang, "smsCancel")}</button>
          <button onClick={() => { setSent(true); setTimeout(() => { onSend(driver.id, message); onClose(); }, 1000); }}
            disabled={sent} style={{ ...S.sendBtn, opacity: sent ? 0.7 : 1 }}>
            {sent ? t(lang, "smsSent") : t(lang, "smsSend")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CLOSE DAY MODAL
// ============================================================
function CloseDayModal({ completedDrivers, onClose, lang }) {
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setStatus("loading");
    try {
      await generateDayCloseReport(completedDrivers, lang);
      setStatus("done");
      setTimeout(() => onClose(), 2000);
    } catch (e) {
      setStatus("error");
      setError(e.message || String(e));
    }
  };

  return (
    <div style={S.modalOverlay} onClick={status === "loading" ? null : onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={S.modalHeader}>
          <span style={S.modalIcon}>📦</span>
          <div>
            <div style={S.modalTitle}>{t(lang, "closeDayConfirmTitle")}</div>
            <div style={S.modalSub}>{new Date().toLocaleDateString()}</div>
          </div>
          {status !== "loading" && <button onClick={onClose} style={S.closeBtn}>✕</button>}
        </div>

        <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.5, marginBottom: 16 }}>
          {t(lang, "closeDayConfirmMsg", { n: completedDrivers.length })}
        </div>

        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: 12, borderRadius: 8, fontSize: 12, color: "#1e40af", marginBottom: 16 }}>
          {t(lang, "closeDayAutoNote")}
        </div>

        {status === "loading" && (
          <div style={{ textAlign: "center", padding: 20, color: "#3b82f6", fontWeight: 700 }}>
            {t(lang, "closeDayLoading")}
          </div>
        )}
        {status === "done" && (
          <div style={{ textAlign: "center", padding: 20, color: "#5B2C8B", fontWeight: 800, fontSize: 16 }}>
            {t(lang, "closeDayDone")}
          </div>
        )}
        {status === "error" && (
          <div style={{ ...S.pickupError, fontSize: 13 }}>
            ⚠ {error}
          </div>
        )}

        {status === "idle" && (
          <div style={S.modalFooter}>
            <button onClick={onClose} style={S.cancelBtn}>{t(lang, "cancel")}</button>
            <button onClick={handleGenerate} style={S.sendBtn}>
              {t(lang, "closeDayBtn")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD (main operations view)
// ============================================================
function Dashboard({ drivers, onManualAssign, onStatusChange, onSMS, onViewIdentity, isMobile, lang }) {
  useTick(5000);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [showCloseDay, setShowCloseDay] = useState(false);

  const queued = drivers.filter(d => d.status === "queued").sort((a, b) => a.checkinTime - b.checkinTime);
  const active = drivers.filter(d => d.status !== "queued" && d.status !== "completed");
  const completed = drivers.filter(d => d.status === "completed");

  const occupiedDoors = active.filter(d => d.door).map(d => d.door);
  const availableDoorsList = DOORS.filter(d => !occupiedDoors.includes(d));
  // Average Job Time (only for completed drivers, only the loading time)
  const completedWithAssignment = completed.filter(d => d.assignedTime && d.completedTime);
  const avgJobMinutes = completedWithAssignment.length > 0
    ? Math.round(completedWithAssignment.reduce((sum, d) =>
        sum + Math.floor((new Date(d.completedTime) - new Date(d.assignedTime)) / 60000), 0) / completedWithAssignment.length)
    : 0;
  // Average Wait Time (check-in → door assignment)
  const completedWithWait = completed.filter(d => d.assignedTime);
  const avgWaitMinutes = completedWithWait.length > 0
    ? Math.round(completedWithWait.reduce((sum, d) =>
        sum + Math.floor((new Date(d.assignedTime) - new Date(d.checkinTime)) / 60000), 0) / completedWithWait.length)
    : 0;
  // Alert counts based on JOB TIME (only for drivers with door assigned)
  const delayedCount = active.filter(d => d.assignedTime && getJobMinutes(d) >= THRESHOLD_RED).length;
  const warningCount = active.filter(d => {
    if (!d.assignedTime) return false;
    const m = getJobMinutes(d);
    return m >= THRESHOLD_YELLOW && m < THRESHOLD_RED;
  }).length;

  const handleDoorClick = (doorNum, driver) => {
    if (driver) setSelectedDoor(driver);
  };

  const handleCloseDayClick = () => {
    if (completed.length === 0) {
      alert(t(lang, "closeDayNoData"));
      return;
    }
    setShowCloseDay(true);
  };

  return (
    <>
      {/* Close Day button row */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button onClick={handleCloseDayClick}
          style={{ ...S.closeDayBtn, opacity: completed.length === 0 ? 0.5 : 1 }}>
          {t(lang, "closeDay")}
          {completed.length > 0 && <span style={S.closeDayCount}>{completed.length}</span>}
        </button>
      </div>

      <div style={{ ...S.kpiRow, gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(6, 1fr)" }}>
        <div style={S.kpiCard}>
          <div style={S.kpiLabel}>{t(lang, "kpiInQueue")}</div>
          <div style={{ ...S.kpiValue, color: queued.length > 0 ? "#f59e0b" : "#6b7280" }}>{queued.length}</div>
        </div>
        <div style={S.kpiCard}>
          <div style={S.kpiLabel}>{t(lang, "kpiActive")}</div>
          <div style={{ ...S.kpiValue, color: "#3b82f6" }}>{active.length}</div>
          <div style={S.kpiSub}>{occupiedDoors.length}/{TOTAL_DOORS} {t(lang, "kpiActiveSub")}</div>
        </div>
        <div style={S.kpiCard}>
          <div style={S.kpiLabel}>{t(lang, "kpiWarning")}</div>
          <div style={{ ...S.kpiValue, color: warningCount > 0 ? "#d97706" : "#6b7280" }}>{warningCount}</div>
          <div style={S.kpiSub}>{t(lang, "kpiWarningSub")}</div>
        </div>
        <div style={S.kpiCard}>
          <div style={S.kpiLabel}>{t(lang, "kpiDelayed")}</div>
          <div style={{ ...S.kpiValue, color: delayedCount > 0 ? "#dc2626" : "#6b7280" }}>{delayedCount}</div>
          <div style={S.kpiSub}>{t(lang, "kpiDelayedSub")}</div>
        </div>
        <div style={S.kpiCard}>
          <div style={S.kpiLabel}>{t(lang, "kpiAvgWait")}</div>
          <div style={{ ...S.kpiValue, color: "#8b5cf6", fontSize: 26 }}>{completedWithWait.length > 0 ? formatElapsed(avgWaitMinutes) : "—"}</div>
          <div style={S.kpiSub}>{t(lang, "kpiAvgWaitSub")}</div>
        </div>
        <div style={S.kpiCard}>
          <div style={S.kpiLabel}>{t(lang, "kpiAvgJob")}</div>
          <div style={{ ...S.kpiValue, color: "#5B2C8B", fontSize: 26 }}>{completedWithAssignment.length > 0 ? formatElapsed(avgJobMinutes) : "—"}</div>
          <div style={S.kpiSub}>{t(lang, "kpiAvgJobSub")}</div>
        </div>
      </div>

      <DockBoard drivers={drivers} onDoorClick={handleDoorClick} isMobile={isMobile} lang={lang} />

      <div style={S.queueSection}>
        <div style={S.sectionTitle}>
          {t(lang, "queueTitle")} ({queued.length} {t(lang, "queueWaiting")})
          {availableDoorsList.length > 0 && queued.length > 0 && (
            <span style={{ fontSize: 11, color: "#5B2C8B", marginLeft: 8, fontWeight: 700 }}>
              · {availableDoorsList.length} {availableDoorsList.length > 1 ? t(lang, "queueDoors") : t(lang, "queueDoor")} {availableDoorsList.length > 1 ? t(lang, "queueAvailables") : t(lang, "queueAvailable")}
            </span>
          )}
        </div>
        <QueueList queuedDrivers={queued} onManualAssign={onManualAssign}
          availableDoors={availableDoorsList} lang={lang} />
      </div>

      {selectedDoor && (
        <DriverDetailModal driver={selectedDoor} onClose={() => setSelectedDoor(null)}
          onStatusChange={onStatusChange} onSMS={onSMS} onViewIdentity={onViewIdentity} lang={lang} />
      )}

      {showCloseDay && (
        <CloseDayModal completedDrivers={completed} onClose={() => setShowCloseDay(false)} lang={lang} />
      )}
    </>
  );
}

// ============================================================
// AUDIT LOG TAB
// ============================================================
function AuditLog({ logs, lang }) {
  if (logs.length === 0) {
    return (
      <div style={S.empty}>
        <div style={S.emptyIcon}>📜</div>
        <div>{t(lang, "auditEmpty")}</div>
        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>{t(lang, "auditEmptySub")}</div>
      </div>
    );
  }
  return (
    <div style={S.driverList}>
      {logs.map((log, i) => (
        <div key={i} style={S.auditEntry}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 20 }}>🔓</span>
            <span style={{ fontWeight: 800, fontSize: 14 }}>{log.action}</span>
            <span style={{ ...S.statusBadge, background: "#fef3c7", color: "#92400e" }}>{log.reason}</span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "#9ca3af" }}>
              {new Date(log.time).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <div style={{ fontSize: 13, color: "#374151", marginTop: 8 }}>
            {t(lang, "auditDriver")}: <b>{log.driverName}</b> · SO #{log.pickupNumber}
          </div>
          {log.details && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{log.details}</div>}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// KIOSK MODE (driver tablet self check-in)
// ============================================================

// Setup screen — first time on a tablet, requires PIN to activate kiosk mode
function KioskSetupScreen({ onActivated, lang, onLangChange, kioskPin = KIOSK_PIN_DEFAULT }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [activated, setActivated] = useState(false);

  const submit = () => {
    if (pin === kioskPin) {
      setActivated(true);
      try { window.localStorage?.setItem(STORAGE_KEY_KIOSK_ACTIVATED, "1"); } catch {}
      setTimeout(() => onActivated(), 1200);
    } else {
      setError(t(lang, "pinIncorrect"));
      setPin("");
    }
  };

  return (
    <div style={S.kioskFullscreen}>
      <div style={S.kioskLangBar}>
        <button onClick={() => onLangChange("es")} style={{ ...S.kioskLangBtn, ...(lang === "es" ? S.kioskLangBtnActive : {}) }}>ES</button>
        <button onClick={() => onLangChange("en")} style={{ ...S.kioskLangBtn, ...(lang === "en" ? S.kioskLangBtnActive : {}) }}>EN</button>
      </div>
      <div style={S.kioskSetupCard}>
        <div style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <BrandIcon size={44} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#3D1A5B", lineHeight: 1.1 }}>
              Icon Produce
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#5B2C8B", marginTop: 2, letterSpacing: 0.5 }}>
              {t(lang, "appSub")}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#3D1A5B", marginBottom: 6 }}>{t(lang, "kioskSetupTitle")}</div>
        <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 28 }}>{t(lang, "kioskSetupSub")}</div>

        <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 10, letterSpacing: 0.5 }}>
          {t(lang, "kioskSetupPin")}
        </div>
        <input type="password" inputMode="numeric" pattern="[0-9]*" maxLength={4} value={pin}
          onChange={e => setPin(e.target.value.replace(/\D/g, ""))}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder="••••"
          style={{ ...S.input, fontSize: 36, letterSpacing: 16, textAlign: "center", fontWeight: 800, padding: "20px 12px", maxWidth: 300, margin: "0 auto", display: "block" }} />
        {error && <div style={{ color: "#dc2626", fontSize: 14, marginTop: 12, fontWeight: 700 }}>{error}</div>}

        {activated ? (
          <div style={{ color: "#5B2C8B", fontSize: 18, marginTop: 24, fontWeight: 800 }}>
            {t(lang, "kioskActivated")}
          </div>
        ) : (
          <button onClick={submit} disabled={pin.length !== 4}
            style={{ ...S.kioskButton, marginTop: 24, opacity: pin.length === 4 ? 1 : 0.4 }}>
            {t(lang, "kioskSetupActivate")}
          </button>
        )}
        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 16, fontStyle: "italic" }}>
          {t(lang, "kioskSetupHint")}
        </div>
      </div>
    </div>
  );
}

// Welcome screen — what driver sees first, then taps to start
function KioskWelcomeScreen({ onStart, lang, onLangChange, onExit }) {
  return (
    <div style={S.kioskFullscreen}>
      <div style={S.kioskLangBar}>
        <button onClick={() => onLangChange("es")} style={{ ...S.kioskLangBtn, ...(lang === "es" ? S.kioskLangBtnActive : {}) }}>ES</button>
        <button onClick={() => onLangChange("en")} style={{ ...S.kioskLangBtn, ...(lang === "en" ? S.kioskLangBtnActive : {}) }}>EN</button>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <BrandIcon size={72} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#3D1A5B", letterSpacing: -0.5, lineHeight: 1.1 }}>
              Icon Produce
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#5B2C8B", marginTop: 4, letterSpacing: 0.5 }}>
              {t(lang, "appSub")}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#3D1A5B", marginBottom: 8 }}>
          {t(lang, "kioskWelcomeTitle")}
        </div>
        <div style={{ fontSize: 16, color: "#6b7280", marginBottom: 48 }}>
          {t(lang, "kioskWelcomeSub")}
        </div>
        <button onClick={onStart} style={S.kioskBigButton}>
          🚛 {t(lang, "kioskStartBtn")}
        </button>
      </div>

      {/* Hidden exit option in corner (long press not implemented but visible to manager) */}
      <button onClick={onExit} style={S.kioskExitBtn} title={t(lang, "kioskExitMode")}>⚙</button>
    </div>
  );
}

// Success screen — shown after a driver completes registration
function KioskSuccessScreen({ driver, onReset, onEdit, lang }) {
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    if (secondsLeft <= 0) { onReset(); return; }
    const timer = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, onReset]);

  return (
    <div style={S.kioskFullscreen}>
      <div style={{ textAlign: "center", maxWidth: 500 }}>
        <div style={{ fontSize: 100, marginBottom: 16 }}>✅</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: "#5B2C8B", marginBottom: 12 }}>
          {t(lang, "kioskSuccessTitle")}
        </div>
        <div style={{ fontSize: 18, color: "#374151", marginBottom: 32, lineHeight: 1.5 }}>
          {t(lang, "kioskSuccessSub")}
        </div>
        <div style={{ background: "white", borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 4, fontWeight: 600 }}>
            {t(lang, "kioskSuccessName")}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16 }}>
            {driver.firstName} {driver.lastName}
          </div>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 4, fontWeight: 600 }}>
            {t(lang, "kioskSuccessOrder")}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#92400e" }}>
            #{driver.pickupNumber}
          </div>
        </div>
        <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 20 }}>
          {t(lang, "kioskSuccessAutoReset", { n: secondsLeft })}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onEdit} style={S.kioskSecondaryButton}>
            {t(lang, "kioskSuccessEdit")}
          </button>
          <button onClick={onReset} style={S.kioskButton}>
            {t(lang, "kioskSuccessNew")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// AUTHENTICATION (Supabase Auth)
// ============================================================

// Hook to manage authentication state using Supabase
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, user: data.user };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo: window.location.origin }
    );
    return { success: !error, error: error?.message };
  };

  return { user, loading, login, logout, resetPassword };
}

// ============================================================
// LOGIN SCREEN
// ============================================================
function LoginScreen({ onLogin, onReset, lang, setLang }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError(t(lang, "loginErrorEmpty"));
      return;
    }
    setLoading(true);
    const result = await onLogin(email, password);
    setLoading(false);
    if (!result.success) {
      setError(t(lang, "loginErrorInvalid"));
      setPassword("");
    }
  };

  if (showForgot) {
    return <ForgotPasswordScreen onBack={() => setShowForgot(false)} onReset={onReset} lang={lang} setLang={setLang} />;
  }

  return (
    <div style={S.loginFullscreen}>
      <div style={S.loginLangBar}>
        <button onClick={() => setLang("es")} style={{ ...S.kioskLangBtn, ...(lang === "es" ? S.kioskLangBtnActive : {}) }}>ES</button>
        <button onClick={() => setLang("en")} style={{ ...S.kioskLangBtn, ...(lang === "en" ? S.kioskLangBtnActive : {}) }}>EN</button>
      </div>

      <div style={S.loginCard}>
        {/* Brand header */}
        <div style={{ marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <BrandIcon size={56} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#3D1A5B", lineHeight: 1.1 }}>
              Icon Produce
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#5B2C8B", marginTop: 3, letterSpacing: 0.5 }}>
              {t(lang, "appSub")}
            </div>
          </div>
        </div>

        <div style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 6, textAlign: "center" }}>
          {t(lang, "loginTitle")}
        </div>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 24, textAlign: "center" }}>
          {t(lang, "loginSub")}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={S.loginLabel}>{t(lang, "loginEmail")}</label>
            <input type="email" autoComplete="email" value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              placeholder="tu@email.com"
              style={S.loginInput}
              disabled={loading} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={S.loginLabel}>{t(lang, "loginPassword")}</label>
            <input type="password" autoComplete="current-password" value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              placeholder="••••••••"
              style={S.loginInput}
              disabled={loading} />
          </div>

          {error && (
            <div style={S.loginError}>⚠ {error}</div>
          )}

          <button type="submit" disabled={loading}
            style={{ ...S.loginButton, opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}>
            {loading ? t(lang, "loginLoading") : t(lang, "loginBtn")}
          </button>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button type="button" onClick={() => setShowForgot(true)}
              style={S.loginForgotLink}>
              {t(lang, "loginForgot")}
            </button>
          </div>
        </form>

        <div style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: 24, paddingTop: 16, borderTop: "1px solid #f3f4f6" }}>
          {t(lang, "loginNeedAccess")}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FORGOT PASSWORD SCREEN
// ============================================================
function ForgotPasswordScreen({ onBack, onReset, lang, setLang }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await onReset(email);
    setLoading(false);
    setSent(true);
  };

  return (
    <div style={S.loginFullscreen}>
      <div style={S.loginLangBar}>
        <button onClick={() => setLang("es")} style={{ ...S.kioskLangBtn, ...(lang === "es" ? S.kioskLangBtnActive : {}) }}>ES</button>
        <button onClick={() => setLang("en")} style={{ ...S.kioskLangBtn, ...(lang === "en" ? S.kioskLangBtnActive : {}) }}>EN</button>
      </div>

      <div style={S.loginCard}>
        <div style={{ marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <BrandIcon size={56} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#3D1A5B", lineHeight: 1.1 }}>
              Icon Produce
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#5B2C8B", marginTop: 3, letterSpacing: 0.5 }}>
              {t(lang, "appSub")}
            </div>
          </div>
        </div>

        <div style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 6, textAlign: "center" }}>
          {t(lang, "loginForgotTitle")}
        </div>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 24, textAlign: "center" }}>
          {t(lang, "loginForgotSub")}
        </div>

        {sent ? (
          <>
            <div style={{ ...S.loginError, background: "#dcfce7", color: "#166534", borderColor: "#86efac", fontSize: 14, textAlign: "center", padding: 16 }}>
              {t(lang, "loginForgotSent")}
            </div>
            <button onClick={onBack} style={{ ...S.loginButton, marginTop: 16 }}>
              {t(lang, "loginForgotBack")}
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label style={S.loginLabel}>{t(lang, "loginEmail")}</label>
              <input type="email" autoComplete="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                style={S.loginInput}
                disabled={loading} />
            </div>

            <button type="submit" disabled={loading || !email.trim()}
              style={{ ...S.loginButton, opacity: (loading || !email.trim()) ? 0.5 : 1 }}>
              {loading ? t(lang, "loginLoading") : t(lang, "loginForgotBtn")}
            </button>

            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button type="button" onClick={onBack} style={S.loginForgotLink}>
                {t(lang, "loginForgotBack")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Main Kiosk app
function KioskApp({ drivers, addDriver, updateDriver, driverHistory, addToHistory, lang, setLang, kioskPin }) {
  const isMobile = useIsMobile();
  const [screen, setScreen] = useState("welcome"); // welcome | form | success
  const [lastDriver, setLastDriver] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);
  const [needsSetup, setNeedsSetup] = useState(() => {
    try { return window.localStorage?.getItem(STORAGE_KEY_KIOSK_ACTIVATED) !== "1"; }
    catch { return true; }
  });

  if (needsSetup) {
    return <KioskSetupScreen
      lang={lang}
      onLangChange={setLang}
      kioskPin={kioskPin}
      onActivated={() => setNeedsSetup(false)} />;
  }

  const handleSubmit = async (driver) => {
    if (editingDriver) {
      // Update existing driver in DB
      await updateDriver(editingDriver.id, {
        firstName: driver.firstName,
        lastName: driver.lastName,
        phone: driver.phone,
        company: driver.company,
        plate: driver.plate,
        pickupNumber: driver.pickupNumber,
      });
      setLastDriver({ ...editingDriver, ...driver });
      setEditingDriver(null);
    } else {
      const newDriver = await addDriver(driver);
      if (newDriver) {
        await addToHistory(newDriver);
      }
      setLastDriver(newDriver || driver);
    }
    setScreen("success");
  };

  const handleEdit = () => {
    setEditingDriver(lastDriver);
    setScreen("form");
  };

  const handleReset = () => {
    setLastDriver(null);
    setEditingDriver(null);
    setScreen("welcome");
  };

  const handleExitKiosk = () => {
    if (window.confirm(t(lang, "kioskExitMode") + "?")) {
      try { window.localStorage?.removeItem(STORAGE_KEY_KIOSK_ACTIVATED); } catch {}
      window.location.href = "/";
    }
  };

  if (screen === "welcome") {
    return <KioskWelcomeScreen
      onStart={() => setScreen("form")}
      onExit={handleExitKiosk}
      lang={lang} onLangChange={setLang} />;
  }

  if (screen === "success" && lastDriver) {
    return <KioskSuccessScreen
      driver={lastDriver}
      onReset={handleReset}
      onEdit={handleEdit}
      lang={lang} />;
  }

  // Form screen
  return (
    <div style={S.kioskFormWrap}>
      <div style={S.kioskFormHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BrandIcon size={32} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>Icon Produce</div>
            <div style={{ fontSize: 11, color: "#FFD93D" }}>{t(lang, "appSub")}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={S.langToggle}>
            <button onClick={() => setLang("es")} style={{ ...S.langBtn, ...(lang === "es" ? S.langBtnActive : {}) }}>ES</button>
            <button onClick={() => setLang("en")} style={{ ...S.langBtn, ...(lang === "en" ? S.langBtnActive : {}) }}>EN</button>
          </div>
          <button onClick={handleReset} style={S.kioskCancelBtn}>{t(lang, "kioskBackToWelcome")}</button>
        </div>
      </div>
      <div style={{ padding: 16, maxWidth: 700, margin: "0 auto" }}>
        <CheckInForm onSubmit={handleSubmit} isMobile={isMobile} driverHistory={driverHistory} lang={lang}
          initialData={editingDriver} />
      </div>
    </div>
  );
}
// ============================================================
// SETTINGS PAGE — configure PINs and sales orders
// ============================================================
// ============================================================
// COMPLETED LIST — shows today's completed jobs
// ============================================================
function CompletedList({ drivers, onViewDetails, lang }) {
  const completed = drivers
    .filter(d => d.status === "completed" && d.completedTime)
    .sort((a, b) => new Date(b.completedTime) - new Date(a.completedTime));

  if (completed.length === 0) {
    return (
      <div style={S.empty}>
        <div style={S.emptyIcon}>✅</div>
        <div>{t(lang, "completedEmpty")}</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#3D1A5B", marginBottom: 16 }}>
        {t(lang, "completedTitle")} ({completed.length})
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {completed.map(driver => {
          const waitMins = driver.assignedTime
            ? Math.round((new Date(driver.assignedTime) - new Date(driver.checkinTime)) / 60000)
            : 0;
          const loadMins = driver.assignedTime && driver.completedTime
            ? Math.round((new Date(driver.completedTime) - new Date(driver.assignedTime)) / 60000)
            : 0;
          const totalMins = waitMins + loadMins;
          const completedAt = new Date(driver.completedTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

          return (
            <div key={driver.id} style={S.completedCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontWeight: 800, fontSize: 17, color: "#3D1A5B" }}>
                    {driver.firstName} {driver.lastName}
                  </div>
                  <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                    SO #{driver.pickupNumber} · {t(lang, "completedPlate")} {driver.plate}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#16a34a", fontWeight: 700, textAlign: "right" }}>
                  ✅ {t(lang, "completedAt")} {completedAt}
                </div>
              </div>

              <div style={S.completedStatsRow}>
                <div style={S.completedStat}>
                  <div style={S.completedStatLabel}>🚪 {t(lang, "completedDoor")}</div>
                  <div style={S.completedStatValue}>{driver.door || "—"}</div>
                </div>
                <div style={S.completedStat}>
                  <div style={S.completedStatLabel}>📦 {t(lang, "completedPallets")}</div>
                  <div style={S.completedStatValue}>{driver.palletCount || "—"}</div>
                </div>
                <div style={S.completedStat}>
                  <div style={S.completedStatLabel}>⏳ {t(lang, "completedWait")}</div>
                  <div style={S.completedStatValue}>{waitMins}m</div>
                </div>
                <div style={S.completedStat}>
                  <div style={S.completedStatLabel}>🔧 {t(lang, "completedLoad")}</div>
                  <div style={S.completedStatValue}>{loadMins}m</div>
                </div>
                <div style={{ ...S.completedStat, background: "#ede9fe" }}>
                  <div style={S.completedStatLabel}>⏱ {t(lang, "completedTotal")}</div>
                  <div style={{ ...S.completedStatValue, color: "#5B2C8B" }}>{totalMins}m</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsPage({ settings, updateSetting, orders, addOrder, removeOrder, lang, isMobile }) {
  const [kioskPin, setKioskPin] = useState(settings.kiosk_pin || "1234");
  const [managerPin, setManagerPin] = useState(settings.manager_pin || "1234");
  const [kioskPinSaved, setKioskPinSaved] = useState(false);
  const [managerPinSaved, setManagerPinSaved] = useState(false);
  const [kioskPinError, setKioskPinError] = useState("");
  const [managerPinError, setManagerPinError] = useState("");
  const [newOrder, setNewOrder] = useState("");
  const [addingOrder, setAddingOrder] = useState(false);

  // Sync local state with settings if it changes (realtime)
  useEffect(() => {
    if (settings.kiosk_pin) setKioskPin(settings.kiosk_pin);
    if (settings.manager_pin) setManagerPin(settings.manager_pin);
  }, [settings.kiosk_pin, settings.manager_pin]);

  const handleSaveKioskPin = async () => {
    if (!/^\d{4}$/.test(kioskPin)) {
      setKioskPinError(t(lang, "settingsPinFormat"));
      return;
    }
    setKioskPinError("");
    const ok = await updateSetting("kiosk_pin", kioskPin);
    if (ok) {
      setKioskPinSaved(true);
      setTimeout(() => setKioskPinSaved(false), 2000);
    }
  };

  const handleSaveManagerPin = async () => {
    if (!/^\d{4}$/.test(managerPin)) {
      setManagerPinError(t(lang, "settingsPinFormat"));
      return;
    }
    setManagerPinError("");
    const ok = await updateSetting("manager_pin", managerPin);
    if (ok) {
      setManagerPinSaved(true);
      setTimeout(() => setManagerPinSaved(false), 2000);
    }
  };

  const handleAddOrder = async () => {
    const cleaned = newOrder.trim().replace(/\D/g, "");
    if (!cleaned) return;
    setAddingOrder(true);
    const ok = await addOrder(cleaned);
    setAddingOrder(false);
    if (ok) setNewOrder("");
  };

  const handleRemoveOrder = async (number) => {
    if (window.confirm(t(lang, "settingsConfirmRemove", { n: number }))) {
      await removeOrder(number);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#3D1A5B", marginBottom: 24 }}>
        {t(lang, "settingsTitle")}
      </h2>

      {/* PINs Section */}
      <div style={S.settingsCard}>
        <div style={S.settingsSection}>
          <div style={S.settingsSectionTitle}>🔒 {t(lang, "settingsKioskPin")}</div>
          <div style={S.settingsSectionSub}>{t(lang, "settingsKioskPinSub")}</div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 12 }}>
            <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={4}
              value={kioskPin}
              onChange={e => { setKioskPin(e.target.value.replace(/\D/g, "")); setKioskPinError(""); }}
              style={{ ...S.input, fontSize: 22, letterSpacing: 8, fontWeight: 800, textAlign: "center", maxWidth: 160 }} />
            <button onClick={handleSaveKioskPin} style={S.settingsSaveBtn}>
              {kioskPinSaved ? t(lang, "settingsPinSaved") : t(lang, "settingsSavePin")}
            </button>
          </div>
          {kioskPinError && <span style={S.error}>{kioskPinError}</span>}
        </div>

        <div style={{ ...S.settingsSection, borderTop: "1px solid #f3f4f6", paddingTop: 20, marginTop: 20 }}>
          <div style={S.settingsSectionTitle}>👤 {t(lang, "settingsManagerPin")}</div>
          <div style={S.settingsSectionSub}>{t(lang, "settingsManagerPinSub")}</div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 12 }}>
            <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={4}
              value={managerPin}
              onChange={e => { setManagerPin(e.target.value.replace(/\D/g, "")); setManagerPinError(""); }}
              style={{ ...S.input, fontSize: 22, letterSpacing: 8, fontWeight: 800, textAlign: "center", maxWidth: 160 }} />
            <button onClick={handleSaveManagerPin} style={S.settingsSaveBtn}>
              {managerPinSaved ? t(lang, "settingsPinSaved") : t(lang, "settingsSavePin")}
            </button>
          </div>
          {managerPinError && <span style={S.error}>{managerPinError}</span>}
        </div>
      </div>

      {/* Sales Orders Section */}
      <div style={{ ...S.settingsCard, marginTop: 20 }}>
        <div style={S.settingsSectionTitle}>📋 {t(lang, "settingsSalesOrders")}</div>
        <div style={S.settingsSectionSub}>{t(lang, "settingsSalesOrdersSub")}</div>

        <div style={{ display: "flex", gap: 10, marginTop: 16, marginBottom: 16 }}>
          <input type="text" inputMode="numeric" pattern="[0-9]*"
            value={newOrder}
            onChange={e => setNewOrder(e.target.value.replace(/\D/g, ""))}
            onKeyDown={e => e.key === "Enter" && handleAddOrder()}
            placeholder={t(lang, "settingsAddOrderPlaceholder")}
            style={{ ...S.input, fontSize: 16, flex: 1 }} />
          <button onClick={handleAddOrder} disabled={!newOrder.trim() || addingOrder}
            style={{ ...S.settingsSaveBtn, opacity: (!newOrder.trim() || addingOrder) ? 0.5 : 1 }}>
            ➕ {t(lang, "settingsAddOrder")}
          </button>
        </div>

        {orders.length === 0 ? (
          <div style={{ fontSize: 14, color: "#6b7280", fontStyle: "italic", padding: "12px 0" }}>
            {t(lang, "settingsNoOrders")}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 8 }}>
            {orders.map(o => (
              <div key={o.number} style={S.salesOrderItem}>
                <span style={{ fontWeight: 800, fontSize: 14, color: "#3D1A5B" }}>#{o.number}</span>
                <button onClick={() => handleRemoveOrder(o.number)} style={S.removeOrderBtn} title={t(lang, "settingsRemoveOrder")}>
                  🗑
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const isMobile = useIsMobile();
  const [lang, setLang] = useLanguage();
  const route = useRoute();
  const { user, login, logout, resetPassword, loading: authLoading } = useAuth();
  const { drivers, addDriver: addDriverDb, updateDriver, loading: driversLoading } = useSupabaseDrivers();
  const { history: driverHistory, addToHistory } = useSupabaseHistory();
  const { auditLog, addAudit } = useSupabaseAudit();
  const { smsLog, addSms } = useSupabaseSms();
  const { settings, updateSetting } = useSupabaseSettings();
  const { orders: salesOrders, addOrder, removeOrder } = useSupabaseSalesOrders();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [smsTarget, setSmsTarget] = useState(null);
  const [identityTarget, setIdentityTarget] = useState(null);

  const [pendingManualDriver, setPendingManualDriver] = useState(null);
  const [managerAuthedDriver, setManagerAuthedDriver] = useState(null);
  const [pendingOverride, setPendingOverride] = useState(null);

  const prevDelayedIds = useRef(new Set());

  // NOTE: Door assignment is now fully manual.
  // Manager must click "Asignar Puerta (Manager)" on each driver in queue.

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDelayed = new Set();
      drivers.forEach(d => {
        if (d.status !== "completed" && d.assignedTime && getJobMinutes(d) >= THRESHOLD_RED) {
          currentDelayed.add(d.id);
        }
      });
      currentDelayed.forEach(id => {
        if (!prevDelayedIds.current.has(id)) playBeep();
      });
      prevDelayedIds.current = currentDelayed;
    }, 10000);
    return () => clearInterval(interval);
  }, [drivers]);

  const addDriver = async (driver) => {
    const savedDriver = await addDriverDb(driver);
    // Save to history using the URLs (not base64) for future auto-fill
    if (savedDriver) {
      await addToHistory(savedDriver);
    }
    setActiveTab("dashboard");
  };

  const requestManualAssign = (driver) => setPendingManualDriver(driver);

  const onPinSuccess = () => {
    setManagerAuthedDriver(pendingManualDriver);
    setPendingManualDriver(null);
  };

  const onDoorPicked = (door, palletCount) => {
    setPendingOverride({ driver: managerAuthedDriver, door, palletCount });
    setManagerAuthedDriver(null);
  };

  const confirmOverride = async (reason) => {
    const { driver, door, palletCount } = pendingOverride;
    await updateDriver(driver.id, {
      door,
      status: "assigned",
      assignedTime: new Date().toISOString(),
      palletCount,
    });
    await addAudit({
      action: t(lang, "auditAction"),
      reason,
      driverName: `${driver.firstName} ${driver.lastName}`,
      pickupNumber: driver.pickupNumber,
      details: t(lang, "auditDetails", { door }) + ` · ${palletCount} pallets`,
    });
    setPendingOverride(null);
    setTimeout(() => setSmsTarget({ ...driver, door, palletCount, status: "assigned" }), 300);
  };

  const updateStatus = (id, status) => {
    const updates = { status };
    if (status === "completed") {
      updates.completedTime = new Date().toISOString();
    }
    updateDriver(id, updates);
  };

  const sendSMS = async (id, message) => {
    const driver = drivers.find(d => d.id === id);
    if (driver) {
      await addSms(driver, message);
    }
  };

  const queued = drivers.filter(d => d.status === "queued");
  const active = drivers.filter(d => d.status !== "queued" && d.status !== "completed");
  const delayedCount = active.filter(d => d.assignedTime && getJobMinutes(d) >= THRESHOLD_RED).length;

  const tabs = [
    { id: "dashboard", label: t(lang, "tabDashboard"), badge: delayedCount > 0 ? delayedCount : null },
    { id: "sms", label: `${t(lang, "tabSMS")} (${smsLog.length})` },
    { id: "audit", label: `${t(lang, "tabAudit")} (${auditLog.length})` },
    { id: "completed", label: `${t(lang, "tabCompleted")} (${drivers.filter(d => d.status === "completed").length})` },
    { id: "settings", label: t(lang, "tabSettings") },
  ];

  const occupiedForManual = drivers.filter(d => d.door && d.status !== "completed").map(d => d.door);

  // Route to Kiosk view if URL is /checkin
  if (route === "kiosk") {
    return <KioskApp
      drivers={drivers} addDriver={addDriverDb} updateDriver={updateDriver}
      driverHistory={driverHistory} addToHistory={addToHistory}
      lang={lang} setLang={setLang}
      kioskPin={settings.kiosk_pin || KIOSK_PIN_DEFAULT} />;
  }

  // Manager dashboard requires authentication
  if (authLoading) {
    return (
      <div style={S.loginFullscreen}>
        <div style={{ color: "#5B2C8B", fontSize: 16, fontWeight: 600 }}>⏳ Cargando...</div>
      </div>
    );
  }
  if (!user) {
    return <LoginScreen onLogin={login} onReset={resetPassword} lang={lang} setLang={setLang} />;
  }

  const handleLogout = () => {
    if (window.confirm(t(lang, "logoutConfirm"))) {
      logout();
    }
  };

  return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.headerLeft}>
          <BrandIcon size={36} />
          <div>
            <div style={S.appTitle}>{t(lang, "appTitle")}</div>
            <div style={S.appSub}>{t(lang, "appSub")}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {!isMobile && (
            <div style={{ fontSize: 11, color: "#FFD93D", fontWeight: 600 }}>
              {t(lang, "legend")}
            </div>
          )}
          <a href="/checkin" target="_blank" rel="noopener noreferrer"
            style={S.kioskLinkBtn} title="Open Driver Check-In page">
            🚛 /checkin
          </a>
          <div style={S.langToggle}>
            <button onClick={() => setLang("es")}
              style={{ ...S.langBtn, ...(lang === "es" ? S.langBtnActive : {}) }}>ES</button>
            <button onClick={() => setLang("en")}
              style={{ ...S.langBtn, ...(lang === "en" ? S.langBtnActive : {}) }}>EN</button>
          </div>
          {!isMobile && (
            <div style={S.userBadge} title={user.email}>
              👤 {user.email.split("@")[0]}
            </div>
          )}
          <button onClick={handleLogout} style={S.logoutBtn} title={user.email}>
            {isMobile ? "↪" : `↪ ${t(lang, "logout")}`}
          </button>
        </div>
      </div>

      <div style={S.tabs}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ ...S.tab, ...(activeTab === tab.id ? S.tabActive : {}) }}>
            {tab.label}
            {tab.badge && <span style={S.tabBadge}>{tab.badge}</span>}
          </button>
        ))}
      </div>

      <div style={{ ...S.content, padding: isMobile ? 12 : 20 }}>
        {activeTab === "dashboard" && (
          <Dashboard drivers={drivers} isMobile={isMobile} lang={lang}
            onManualAssign={requestManualAssign}
            onStatusChange={updateStatus}
            onSMS={setSmsTarget}
            onViewIdentity={setIdentityTarget} />
        )}
        {activeTab === "sms" && (
          <div>
            {smsLog.length === 0 ? (
              <div style={S.empty}><div style={S.emptyIcon}>📱</div><div>{t(lang, "smsEmpty")}</div></div>
            ) : (
              <div style={S.driverList}>
                {smsLog.map((entry, i) => (
                  <div key={i} style={S.smsEntry}>
                    <div style={S.smsEntryHeader}>
                      <span style={{ fontWeight: 800 }}>{entry.driver.firstName} {entry.driver.lastName}</span>
                      <span style={{ fontSize: 12, color: "#6b7280" }}>{entry.driver.phone}</span>
                      <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: "auto" }}>{new Date(entry.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                    <div style={S.smsMessage}>"{entry.message}"</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "audit" && <AuditLog logs={auditLog} lang={lang} />}
        {activeTab === "completed" && (
          <CompletedList drivers={drivers} lang={lang} />
        )}
        {activeTab === "settings" && (
          <SettingsPage
            settings={settings}
            updateSetting={updateSetting}
            orders={salesOrders}
            addOrder={addOrder}
            removeOrder={removeOrder}
            lang={lang}
            isMobile={isMobile} />
        )}
      </div>

      {smsTarget && <SMSModal driver={smsTarget} onClose={() => setSmsTarget(null)} onSend={sendSMS} lang={lang} />}
      {identityTarget && <IdentityModal driver={identityTarget} onClose={() => setIdentityTarget(null)} lang={lang} />}
      {pendingManualDriver && (
        <ManagerPinModal lang={lang}
          title={t(lang, "pinTitle")}
          subtitle={t(lang, "pinSub", { name: `${pendingManualDriver.firstName} ${pendingManualDriver.lastName}` })}
          managerPin={settings.manager_pin || MANAGER_PIN_DEFAULT}
          onSuccess={onPinSuccess}
          onClose={() => setPendingManualDriver(null)} />
      )}
      {managerAuthedDriver && (
        <ManualAssignModal lang={lang}
          driver={managerAuthedDriver}
          occupiedDoors={occupiedForManual}
          onAssign={onDoorPicked}
          onClose={() => setManagerAuthedDriver(null)} />
      )}
      {pendingOverride && (
        <OverrideReasonModal lang={lang}
          action={t(lang, "overrideAction", { door: pendingOverride.door })}
          driver={pendingOverride.driver}
          onConfirm={confirmOverride}
          onClose={() => setPendingOverride(null)} />
      )}
    </div>
  );
}

// ============================================================
// STYLES
// ============================================================
const S = {
  app: { fontFamily: "'IBM Plex Sans', -apple-system, sans-serif", background: "#f0f4f8", minHeight: "100vh", paddingBottom: 40 },
  header: { background: "linear-gradient(135deg, #3D1A5B 0%, #5B2C8B 100%)", color: "white", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  logo: { fontSize: 32 },
  appTitle: { fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" },
  appSub: { fontSize: 11, color: "#FFD93D", marginTop: 2, letterSpacing: 0.5 },
  langToggle: { display: "flex", background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: 3, gap: 2 },
  langBtn: { padding: "5px 12px", border: "none", background: "transparent", color: "#FFD93D", fontSize: 12, fontWeight: 700, cursor: "pointer", borderRadius: 6, letterSpacing: 0.5 },
  langBtnActive: { background: "white", color: "#3D1A5B" },
  kioskLinkBtn: { padding: "6px 14px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap" },

  // Kiosk mode
  kioskFullscreen: { minHeight: "100vh", background: "linear-gradient(180deg, #FFFCEB 0%, #F3E8FF 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative" },
  kioskLangBar: { position: "absolute", top: 24, right: 24, display: "flex", background: "white", borderRadius: 10, padding: 4, gap: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  kioskLangBtn: { padding: "8px 18px", border: "none", background: "transparent", color: "#6b7280", fontSize: 14, fontWeight: 800, cursor: "pointer", borderRadius: 6 },
  kioskLangBtnActive: { background: "#5B2C8B", color: "white" },
  kioskBigButton: { padding: "24px 60px", background: "linear-gradient(135deg, #5B2C8B 0%, #3D1A5B 100%)", color: "white", border: "none", borderRadius: 16, fontSize: 24, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 24px rgba(22, 163, 74, 0.3)", letterSpacing: 0.5 },
  kioskButton: { padding: "14px 28px", background: "#5B2C8B", color: "white", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 800, cursor: "pointer" },
  kioskSecondaryButton: { padding: "14px 24px", background: "white", color: "#92400e", border: "2px solid #fbbf24", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" },
  kioskExitBtn: { position: "absolute", bottom: 16, right: 16, width: 40, height: 40, borderRadius: 20, background: "rgba(0,0,0,0.05)", border: "none", color: "#9ca3af", fontSize: 18, cursor: "pointer" },
  kioskSetupCard: { background: "white", borderRadius: 20, padding: 40, textAlign: "center", maxWidth: 460, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" },
  kioskFormWrap: { minHeight: "100vh", background: "#f0f4f8" },
  kioskFormHeader: { background: "linear-gradient(135deg, #3D1A5B 0%, #5B2C8B 100%)", color: "white", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 },
  kioskCancelBtn: { padding: "6px 12px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" },

  // Login screen
  loginFullscreen: { minHeight: "100vh", background: "linear-gradient(180deg, #ede9fe 0%, #faf9fc 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative" },
  loginLangBar: { position: "absolute", top: 24, right: 24, display: "flex", background: "white", borderRadius: 10, padding: 4, gap: 2, boxShadow: "0 2px 8px rgba(91, 44, 139, 0.12)" },
  loginCard: { background: "white", borderRadius: 20, padding: 36, width: "100%", maxWidth: 420, boxShadow: "0 10px 40px rgba(91, 44, 139, 0.15)" },
  loginLabel: { display: "block", fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 },
  loginInput: { width: "100%", padding: "13px 14px", border: "1.5px solid #d1d5db", borderRadius: 10, fontSize: 15, outline: "none", boxSizing: "border-box", color: "#111827", background: "#fafafa" },
  loginButton: { width: "100%", padding: "14px", background: "linear-gradient(135deg, #5B2C8B 0%, #3D1A5B 100%)", color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 800, cursor: "pointer", letterSpacing: 0.3, boxShadow: "0 4px 12px rgba(91, 44, 139, 0.3)" },
  loginError: { padding: "10px 12px", background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5", borderRadius: 8, fontSize: 13, fontWeight: 600, marginBottom: 14 },
  loginForgotLink: { background: "none", border: "none", color: "#5B2C8B", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "underline", padding: 0 },
  logoutBtn: { padding: "6px 12px", background: "rgba(255, 217, 61, 0.15)", color: "#FFD93D", border: "1px solid rgba(255, 217, 61, 0.3)", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" },
  userBadge: { display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(255,255,255,0.1)", borderRadius: 20, fontSize: 11, color: "#FFD93D", fontWeight: 600 },
  tabs: { background: "white", borderBottom: "2px solid #e5e7eb", display: "flex", padding: "0 12px", overflow: "auto" },
  tab: { padding: "14px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#6b7280", borderBottom: "3px solid transparent", marginBottom: -2, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 },
  tabActive: { color: "#5B2C8B", borderBottomColor: "#5B2C8B" },
  tabBadge: { background: "#dc2626", color: "white", fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 10 },
  content: { maxWidth: 1200, margin: "0 auto" },

  // KPI cards
  kpiRow: { display: "grid", gap: 10, marginBottom: 16 },
  kpiCard: { background: "white", borderRadius: 12, padding: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  kpiLabel: { fontSize: 10, fontWeight: 800, color: "#6b7280", letterSpacing: 1, textTransform: "uppercase" },
  kpiValue: { fontSize: 32, fontWeight: 900, lineHeight: 1.1, marginTop: 4 },
  kpiSub: { fontSize: 10, color: "#9ca3af", marginTop: 4 },

  // Close Day button
  closeDayBtn: { padding: "10px 20px", background: "linear-gradient(135deg, #5B2C8B 0%, #5B2C8B 100%)", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", display: "inline-flex", alignItems: "center", gap: 8 },
  closeDayCount: { background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 800 },

  // Dock board
  dockBoard: { background: "white", borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  dockBoardTitle: { fontSize: 13, fontWeight: 800, color: "#111827", marginBottom: 12, letterSpacing: 0.5 },
  dockGrid: { display: "grid", gap: 8 },
  dockCell: { border: "2px solid", borderRadius: 10, padding: 8, textAlign: "center", minHeight: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "transform 0.1s" },
  dockCellEmpty: { background: "#f9fafb", borderColor: "#e5e7eb", cursor: "default" },
  dockNum: { fontSize: 24, fontWeight: 900, lineHeight: 1 },
  dockEmptyLabel: { fontSize: 10, fontWeight: 600, color: "#9ca3af", marginTop: 4, letterSpacing: 1 },

  // Queue
  queueSection: { background: "white", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  sectionTitle: { fontSize: 13, fontWeight: 800, color: "#111827", marginBottom: 12, letterSpacing: 0.5 },
  queueItem: { display: "flex", alignItems: "center", gap: 12, padding: 14, borderLeft: "4px solid #f59e0b", background: "#fafafa", borderRadius: 8, marginBottom: 8 },
  queuePosition: { fontSize: 22, fontWeight: 900, color: "#f59e0b", minWidth: 40 },
  autoAssignBtn: { padding: "8px 14px", background: "#5B2C8B", color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" },
  assignDoorBtn: { padding: "12px 20px", background: "linear-gradient(135deg, #5B2C8B 0%, #3D1A5B 100%)", color: "#FFD93D", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 2px 6px rgba(91, 44, 139, 0.25)", letterSpacing: 0.3 },

  // Settings page
  settingsCard: { background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(91, 44, 139, 0.06)" },
  settingsSection: { marginBottom: 4 },
  settingsSectionTitle: { fontSize: 16, fontWeight: 800, color: "#3D1A5B", marginBottom: 4 },
  settingsSectionSub: { fontSize: 12, color: "#6b7280", marginBottom: 8 },
  settingsSaveBtn: { padding: "12px 22px", background: "linear-gradient(135deg, #5B2C8B 0%, #3D1A5B 100%)", color: "#FFD93D", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" },
  salesOrderItem: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#faf9fc", border: "1.5px solid #ede9fe", borderRadius: 8 },
  removeOrderBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#dc2626", padding: 4, opacity: 0.6 },

  // Completed list
  completedCard: { background: "white", borderRadius: 12, padding: 16, boxShadow: "0 1px 4px rgba(91, 44, 139, 0.05)", borderLeft: "4px solid #16a34a" },
  completedStatsRow: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" },
  completedStat: { background: "#f9fafb", padding: "8px 12px", borderRadius: 8, minWidth: 70, textAlign: "center", flex: "1 1 auto" },
  completedStatLabel: { fontSize: 10, color: "#6b7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 },
  completedStatValue: { fontSize: 16, fontWeight: 800, color: "#374151", marginTop: 2 },
  manualAssignBtn: { padding: "8px 14px", background: "white", color: "#92400e", border: "1.5px solid #fbbf24", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" },
  emptyQueue: { textAlign: "center", padding: 40 },

  // Form
  formCard: { background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  formHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  formIcon: { fontSize: 32 },
  formTitle: { fontSize: 18, fontWeight: 800, color: "#111827" },
  formSub: { fontSize: 12, color: "#6b7280" },
  pickupBox: { background: "linear-gradient(135deg, #FFF4B8 0%, #FFD93D 100%)", border: "2px solid #5B2C8B", borderRadius: 12, padding: 16, marginBottom: 20 },
  pickupLabel: { fontSize: 14, fontWeight: 800, color: "#3D1A5B", letterSpacing: 0.5 },
  pickupSub: { fontSize: 11, color: "#5B2C8B", marginBottom: 10, opacity: 0.85 },
  pickupInput: { width: "100%", padding: "14px 16px", border: "2px solid #5B2C8B", borderRadius: 10, fontSize: 20, fontWeight: 700, letterSpacing: 1, outline: "none", boxSizing: "border-box", background: "white", color: "#3D1A5B" },
  pickupInputValid: { borderColor: "#5B2C8B", background: "#FFFCEB" },
  pickupInputInvalid: { borderColor: "#dc2626", background: "#fef2f2" },
  pickupInputLoading: { borderColor: "#3b82f6", background: "#eff6ff" },
  pickupLoading: { marginTop: 10, padding: 10, background: "#dbeafe", color: "#1e40af", borderRadius: 8, fontSize: 13, fontWeight: 600, textAlign: "center" },
  pickupMatch: { marginTop: 10, padding: 12, background: "white", borderRadius: 8, border: "1px solid #FFD93D" },
  pickupError: { marginTop: 10, padding: 10, background: "#fee2e2", color: "#991b1b", borderRadius: 8, fontSize: 13, fontWeight: 700 },
  demoHint: { fontSize: 10, color: "#3D1A5B", marginTop: 8, fontStyle: "italic", opacity: 0.7 },
  sectionLabel: { fontSize: 11, fontWeight: 800, color: "#5B2C8B", letterSpacing: 1.5, marginBottom: 10, marginTop: 18, borderBottom: "1px solid #F3E8FF", paddingBottom: 6 },
  returningBanner: { background: "#F3E8FF", border: "1px solid #FFD93D", color: "#5B2C8B", padding: 12, borderRadius: 8, marginBottom: 14, fontSize: 13 },
  firstTimeBanner: { background: "#dbeafe", border: "1px solid #93c5fd", color: "#1e40af", padding: 12, borderRadius: 8, marginBottom: 14, fontSize: 13 },
  grid1: { display: "grid", gridTemplateColumns: "1fr", gap: 0 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  field: { marginBottom: 14 },
  label: { display: "block", fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 },
  input: { width: "100%", padding: "11px 12px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 15, outline: "none", boxSizing: "border-box", color: "#111827", background: "#fafafa" },
  inputError: { borderColor: "#ef4444", background: "#fef2f2" },
  error: { fontSize: 11, color: "#ef4444", marginTop: 4, display: "block" },
  infoBox: { background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: 12, fontSize: 13, color: "#1e40af", marginTop: 16, marginBottom: 16 },
  submitBtn: { width: "100%", padding: "16px", background: "linear-gradient(135deg, #5B2C8B 0%, #3D1A5B 100%)", color: "white", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 800, cursor: "pointer", letterSpacing: 0.5 },
  consentBox: { background: "#fefce8", border: "1px solid #fde047", borderRadius: 8, padding: 14, marginBottom: 14 },
  captureCard: { background: "#f9fafb", border: "1.5px dashed #d1d5db", borderRadius: 10, padding: 14, textAlign: "center", marginBottom: 14 },
  captureLabel: { fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 10, letterSpacing: 0.3 },
  captureBtn: { width: "100%", padding: "20px", background: "white", border: "2px dashed #5B2C8B", borderRadius: 8, color: "#5B2C8B", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  selfieImg: { width: "100%", maxWidth: 200, borderRadius: 10, aspectRatio: "1/1", objectFit: "cover" },
  signatureImg: { width: "100%", background: "white", border: "1px solid #e5e7eb", borderRadius: 8 },
  retakeBtn: { marginTop: 8, padding: "6px 14px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600 },

  // Driver list / SMS / Audit
  driverList: { display: "flex", flexDirection: "column", gap: 10 },
  statusBadge: { fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap" },
  empty: { textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontSize: 14 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  auditEntry: { background: "white", borderRadius: 10, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderLeft: "4px solid #f59e0b" },
  smsEntry: { background: "white", borderRadius: 10, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  smsEntryHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" },
  smsMessage: { fontSize: 13, color: "#374151", background: "#FFFCEB", padding: "10px 14px", borderRadius: 8, borderLeft: "3px solid #5B2C8B" },

  // Modals
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 },
  modal: { background: "white", borderRadius: 14, padding: 20, width: 500, maxWidth: "100%", maxHeight: "90vh", overflow: "auto" },
  modalHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  modalIcon: { fontSize: 28 },
  modalTitle: { fontSize: 17, fontWeight: 800, color: "#111827" },
  modalSub: { fontSize: 12, color: "#6b7280" },
  closeBtn: { marginLeft: "auto", background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" },
  doorGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 16 },
  doorBtn: { padding: "14px 4px", border: "1.5px solid #d1d5db", borderRadius: 8, background: "white", cursor: "pointer", fontSize: 16, fontWeight: 700, color: "#374151", position: "relative" },
  doorBtnActive: { background: "#5B2C8B", color: "white", borderColor: "#5B2C8B" },
  doorBtnTaken: { background: "#fee2e2", borderColor: "#fecaca", color: "#991b1b", cursor: "not-allowed", opacity: 0.7 },
  doorTakenLabel: { fontSize: 8, fontWeight: 600, marginTop: 2 },
  cameraWrap: { position: "relative", width: "100%", background: "#000", borderRadius: 10, overflow: "hidden", aspectRatio: "1/1" },
  video: { width: "100%", height: "100%", objectFit: "cover" },
  cameraOval: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "70%", height: "80%", border: "3px dashed rgba(255,255,255,0.6)", borderRadius: "50%", pointerEvents: "none" },
  signaturePadWrap: { background: "white", border: "2px solid #d1d5db", borderRadius: 10, overflow: "hidden" },
  signatureCanvas: { width: "100%", height: 180, touchAction: "none", cursor: "crosshair", display: "block" },
  smsTextarea: { width: "100%", padding: 12, border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14, resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" },
  charCount: { fontSize: 11, color: "#9ca3af", textAlign: "right", marginTop: 4 },
  modalFooter: { display: "flex", gap: 10, marginTop: 16, justifyContent: "flex-end", flexWrap: "wrap" },
  cancelBtn: { padding: "10px 20px", border: "1.5px solid #d1d5db", borderRadius: 8, background: "white", cursor: "pointer", fontSize: 14, fontWeight: 600 },
  sendBtn: { padding: "10px 20px", background: "#5B2C8B", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700 },
};
