import React, { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  CheckCircle2, PhoneOff, Clock, DollarSign, XCircle, StickyNote,
  Settings, ArrowLeft, Plus, Trash2, Phone, MessageSquare,
  AlertCircle, Crown, ChevronRight, MessageCircle, Mail, Bell, Pencil, Award, TrendingUp,
  Lock, LogOut, Eye, EyeOff, UserPlus, Inbox, Check, X, ClipboardList, Database, FileText, Users,
  MessageSquareText, ListTodo, Tag, Target, History, Calendar, Zap, BarChart3, Info,
} from "lucide-react";

// ---------- SUPABASE CLIENT ----------
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file");
}

const supabase = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY || "placeholder"
);


// ---------- BRAND ----------
const LOGO_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAACGCAMAAACbiKOFAAABWGlDQ1BJQ0MgUHJvZmlsZQAAeJx9kLFLw1AQxr9WpaB1EB0cHDKJQ5SSCro4tBVEcQhVweqUvqapkMZHkiIFN/+Bgv+BCs5uFoc6OjgIopPo5uSk4KLleS+JpCJ6j+N+fO+74zggOW5wbvcDqDu+W1zKK5ulLSX1jAS9IAzm8Zyur0r+rj/j/T703k7LWb///43Biukxqp+UGcZdH0ioxPqezyXvE4+5tBRxS7IV8onkcsjngWe9WCC+JlZYzagQvxCr5R7d6uG63WDRDnL7tOlsrMk5lBNYxA48cNgw0IQCHdk//LOBv4BdcjfhUp+FGnzqyZEiJ5jEy3DAMAOVWEOGUpN3ju53F91PjbWDJ2ChI4S4iLWVDnA2Rydrx9rUPDAyBFy1ueEagdRHmaxWgddTYLgEjN5Qz7ZXzWrh9uk8MPAoxNskkDoEui0hPo6E6B5T8wNw6XwBA6diE8HYWhMAAAA/UExURQAAAFcxlPHu92pPmNvP7K+dzNzT6eTc7opzsMa23puIubS0tH9/f+Gt4rCw8H9//wAAAAAAAAAAAAAAAAAAAForMlwAAAAQdFJOUwD+Dvzu+Jxh/fH9AwIFBAKcfv2nAAARlElEQVR42u1di5KrKBAlDQhCNP//t0s3Cg0Cmpm5larwAozSzsr5ePxkNI6ZQwI/xL3urJACCNmhA/xQwSl1UoZIfwNziX8jJp1xC4vqdUEiO29LuB3gI/oMDDyjeAV/GbbwC8S4Y3g2VoDfm34EMGbBq/wr310l7TKwI3gAD8Y4kc0CK8bwQEBNvVHIQcn8byB6i6jxvg9HnaGG8A+BSr9OFuBBG8e7hLgLE8BlAqCrr5Xcyn3OAdQq9sj6a3ZXgDQ3gB2lzvn4IDgfAPVW/ISgPp2R74F4EOrG8AegI9LAE63Gu6tG8AbwJuF/wcAKrHcWH3HjJluADvLXgPwBqq39CUAb1euH0yw4vaFv7OMvuIK32mRPoDqnIftHQ/sL1CnUlDOd0R6TILyzIqGu0KmT4FiOsvK3RrkDMFhWiQw8K1BhgCCGdFgcELuYOoZCQrVDezL4AWLu8ryjAahx8XEv/6ffjXA63nhJPjbNGimljWDFZbf5F9Iyx8PLQs/r3N9Pimcs3T3P37hh7k4IGgLe0ZKF/ATPyf/qo3IMgej1F79BS340kkTdDdhp/IP/Ge5GE3qWCS9La0U3pP/HmZg0uI/Hv8XP1JqDitgiH/U8MSTxH4SXgCHc9LueOBVfPBZ3Qdr+G66V601/iYR7naB7xLdpNIyOaQYgIUp9gTERRXtIAq+A+ED6eWTrIvPFNhjL7YPV+MHWrvwE+J+n9bGeEtx0U+BSqp8QbLMdl/oz+wbbtReCgxXCAw6Setaqsys7B0fj9u3Jx7HRg1sNEC83efrUSp04s+tIXsTwqyauEPTVlmWqSyUynNbryVKXpgThRG3YEuwhyIi2r9h0yRCW1b/PFKgf4cOjwDiJu2adplL2lF6zE0fHWHeREsNYB1YIlB/0baJz9mgCkS5iJKRxD0pu+XrAA5qsveSdlig719icKhFgUd/Kmz3q/5J4LRp5qIehf08CxTPYl2/BuCKjDYqpNtVzMC7DPJuqQB82LnxWDAS/CuBJHQOwETTUErGSrs2vGwlNGTgrM9CF4DKRw4bB3CrAkChWxLThS/1v0V9SncChWR1TOYSgiWASFwVp5UPaEu/wORK7WsLIx9xWSoWFtrGzarn8RsAovmr5mGUcLOz17cBBOCchsYGGp6M3KiSjquD8FWaxDA/aUZqLgG0+FxxFVDrzwMYrTR7FqaWQehcIMKKhcM/7MEESopWJ7dqRJCCiyu07uEkJEF0jLkMtIH7D5s9Pg8gMtmsr9QrSHHBVa5lICdA0rnxS/OPRjUCjADRatlPsmyzSZQASrTUtxwFo9VAz58FEJ5BAdprBTMo8c1JE1MN4FRgY/ZQ1d5sIeWsihA5FpWs20mGf2xqAFF/L5Eu2Xd82pDB0KC+CN+l8v0DgFo26oYXAQQOWtLAr5JS7WY73VoGX0ANoIEY4PFg7G8B2GscHknCccCwBHApPpizSwNidqQtTIxIlcJuP2etd5uK3TadFiww90sArsJcoj9Z2WTPNwC0hY0Gye9Wc3Rd19fKT5pZDOdVoD+V6bCc/H/CbwEY5N+FLHuwyZzTIk9XGLbDlgCurB4xSDdYmeqibbAprzip7FYuRV7tC/82BR6N3CPDOtYwMscQduDigRwcANhg/v3vHoDZP0E3948BiI3DI/zQh5uTTUHmwox+8kPYQeLkMoDPQP/pzzaAJCj/MIDjBHu44yjP/RYU9GSCkMmtp27s+jKA8GQGEZdswAH8wxSIYIz891kY2DN4wU+eNhPYmOCECt0tXniLheGMhTVXQQjg/GcAxCinHnm+Jgl7nRY5cwIDXvprSmQplUiUgv6qEoG/RIF+VGmJPLpl7tDNEiwoQ2mzSbteBueqGYPpLAqS+RLArhnzxwAEGBRaYoxuD0EHM9/JKrBFyTHzLoCFfAvyw5EbB5geZChrbkgXu5k/JQP9oNqcQujAfJUynmeRk6feZI9rrhxGUMki0jEA6nhtXdOVC5+//hCAaEIP8IOFV07UQxYIwl4N6wFAFhCwOYW0W6Axk8YDV6lDpcyl1MGEX2fhrgkYfsHTFzUFcEzeoEIQlyiwCJVSAGoVmNLfcUV9VYVsJuHXxVfhrHn6UwACMxCq5ep4C7SmBHRnbB0CqjxYvwcEg0nOEQtayZZpTKrh4DFyWwdUfxfAQBhdAmx4uk1q7UyIqgEsrU3K8s2aZ19QMpZha5QQqKOLuP8hpP+bADbk2qBAP8jLlsdCv+AY/NWPA4AcfhnzRbKsyPZQzBLBc4qTZFTgfwbApd8sEn7OE44a2zaFZRPAOqRfiLKmyAU4ylnZKtv+MwD6hl7I/HQAZQXhms7yCucAxqi+PEusD/1yZIs1AvgnXDlMg3RqpMNded8IuzbxttPF0o5pln2Vb4J5N84s4ElkF1yhQP0JAEXXCEQ/4DKAzX6SBoBLlwZzigVefupyxQ7VAUDfAND8+8lzmxvQ4eC1JTLnNoANa5rlKxM4WPbgjhBSWIwFr1SLUKUN/Lt4IS5SoFWf0CE9gWN1K6kKHZ0jG0PeVpNGI8lUYPmiocFV6h5TSjxRv1INqzycNBt+41coEP49gGrucNQMHQDbavhYfRnTfLJW6JS9p5SAFIIqWvQsglvyLBljmrRmo62t1oIHv/0OoGgDGLYW7gMsvPa65VAlrs3QdbvAzzXqFGKlaVhF/pMCgVTOrJ3bKpqFqL6Mzp6oNpHOiQVN7CSPRqWjLbA+OBG4gJkuwI/n6RMAdsxoOTdndcACbQCtAH9E8JlKXIsIPviy9DU4vHA0mJ7VSVBVdpYHm5/+exb2vYo9BBDaPO86gwHeKamFwV+XLhHl423v8IE2tT6AnQBBB8BAgc3TAV64oMHe+PmzfbC8uLODeLYP5os+USM9ALAZo3qKDgvL/+nM7ncBLEusymm/cAN4BcCOHWhvCrwK4Cx/QIm8GXH7l+G8zwLY9YV1yw48rOHBZsdmTMksy9nFhaA+ftrqu4WtnbZ95sUmty8A6GQvlHflga+js16lKbn9WjBXrJ03SWmfz75v7uG6QfUdAL0X9mL0OijsqVrAo0D1wVgwAoWhFz7FoAS5JVM6Cu2d1xThjJdl/xBwo0lM2RlEG5tOopAXfff2BKbmgh8CsBv96kRjyjWrafMOyE2uj86KuxTB42NdsTYm8SNRYilDeS11botI3R5fMRN7RFU2HZx1WNu4JW/iW7j2ViLsHoo35vErG0t1JwC+DWAneCNVM6BaLbv3wcfQ9OEwFdzATn5GORaQwXbXmNvDm3b1pZSW35ZxsT7EZgA11qQIGa1VajDnPfoU0Jhi5tXKxuKlPN9j4c77MygeMohI8zSbimnxtjLHQnO/kfqh30JuIPlWIlaKSKO4nCjigTn0Jbf2FqXr3Ay2vmDTcTu0okWvr+htAHuxm3FSqQrKL90wpIxsB+1sfyBCQ6q0mcnOFUvuMQAQ4yGNL5f0eDoACtUIlXyJhcHJ3tn+KtiU6+nOWiF13kuLEKUvHQCzNd8HEONq0A2BTr33W+ifAXDtvkGoLSN0H6N+5g2z+YOCd6EOFJi7DCOPJ2+9DSDqmF7GD3oA/gwL96zoXlufls22TCIUlpQsu2qP1Qllzy3lDrQtihfSnzEzNQQQilFN5eZBQtS3tSmR+UeUSNEGVDyg9gsf9ru2mzEgWeXkDqBMpoLMgTFG6JKa5VlPJzV+snJfqv3IF58CKDhGce+UuZmn/WC65580Y3w/fzKtA4WzKU8m1jQDMOXh9qOWT9ZM16YScxIAJcmxggeplyGAQT6k2wicQJvvDQq4VwJQTz/viQB0yrhONPYGwppS+KIAcPXrurAghWTGBLUf+ljEZZkeSTdCCc0lgyLsBCcApodjkZ/X/dFKbLgTDEBYsgP9E74wUCVuW/Z22pUqCkw/QzQoMAMYKHB3F5NhskIu40aBuwOIDpDnISKBMxXGMnDe7xsVymuzmaxwRHOZhec81iforef3AVy60y7Dr1y/DqCOzqZIUk5nd7HohkhUyQC05LLwIm90yocAplLh3O+I9UwuejmZD6zYpvoIOxojexlA6FZxxXq9cwBReR4BfIiZVsIPiWT/JhalhSUJSQZgNC+gEJqBjEYApiwkM02C+zzF8rGWGSPcYBb+VQADn3SsJ9l/8VwGUDBZXSqRZC7sd2uzJOfanRVPMwAd1fXXAKqLAPJ+xz3G8Y8AfIpeK450k1hPACSTwGnXMmNa9KxOAJwYgEhFK5/Uo3OR8HUAxS4Nm4b09wEM7lO3jFVdaDYkEhO8cK4NoETLQmQ42BR6Vt1aUCBWqT9Z3eY7FMi8i9jm0wFQfxfA1YMSffy6gx10n8haAMrYlOcFk4Epzu1zefsBwLIBpQEgtAC02XgAEcNs/4aFAauAXacNse9lD4MJK3flmF+g4uysZMYEYbnE2o/s3ckKwFI8oxY2LndJ4NVrKtdGO3DmDY/bChQcOwKZFs5rNNngHEAMkvXOkeOhCe2ASrR6Mpsm2UgxUaofT2XEVpjsqTABkAF80u3JIjS+m4xpUlkKH1huSOu965QoGGfGgs92IDMDp2ZcCi4BGAdDdqMXV4dO8IgT9cQxO9BkJ0OryphAL36jEc0jLowCq0ktUjGbm9oveB9CAWDsxYM07IywZ56ISSk5KgCPiK30H6waeW7JgT6AMQnYbWXn4xDHAPKYvZigqOtEc3bajcA4pwOYyNgbRVgkAlltAxAbcYqxUGQUME/QxVCDzUTHpa8U8fAuIANBZADNSVbPXGBhylHpjv9G+I3nZ9XRmFzkxwDUwU1SmeLiG8QMU+CYC7K81TXItOTK6WrSG41dzMEcSsPk5AepL1bcUx0OPhWLxvBfMqGbPKHnjAk6WLHvPKbqBgDGGd2dOVqS5paeTGLMhnScdwyws8DCfeHwUaYZSpv5IvVSlPpaUvs5GiPrwu6FYgvFoy6KpksLqoo1qk48cJ6RFYn2aeKSCqQb/hkDiEWkrgcflSufzW9LIRCoi/o4gKhSElVscyeh15EjY5l5r7tPx2x8O64sJA2n6b7CIri/phORRsUVARQxph1wDEQxBFDP/RGCNKTJn2bxcwzJ+7WokCgo0POaL0kvMKFKYtnBDwY5ERpH8+zkDh01AtQdZ0WgvAug2SkQFaeiBCvh2QXwOM+Q2X4XBzBu8gmVte81B8hdJjImjjXkx+AZtTmsnbTmhsDSjbzhYeocWpozmmLPaT8nwgA0KrC0j4M4BhSo9QFCKpZXrA5ivPZIbxNAzSgQ3QkeMCVaDeq/fPUiWmpbYl0fX0dGMw2T7QqHzG/ZlFsTOD4bQ0UNQwoE0BiFNTrwyXTCwuGwnlP1A2VWtuIMuDaq/kWsguvo7sWWL7JsNlG6mHn/njiQi0Zpsq+323j6mFh3jaqGsvRmm8ud7n1m+IGnDoC8uYsTGyis06xMIBlINo9T279np87MGJxKH2fZ0xDkaZtSf/UlX9uvoKniz2OhKzUouD0YRsZfXLG8HR+SMfg7Yy/EhMP0fUrOOL6oVcIINgHoGS/euyTw6mKOPE3zp8nxjsgi7P302GhAvRPlcnHOerg/HUOXEcJZnRnS614uZ3A2xxcqEZ8kOJRaj3OyUExt4fJUL2VSBD0VVVGweYuqs9ItD0YVKxYtQVWhny6OYrVRv7hvvu+NvN9cUffg/0ROhu2qE1eurCxc3x6nv8+bvtTu4k9q/k6+HNbRxetxqn21+RsNF4xAzoMJ2GpA/QRfrIB+htXuf3jGlQ++nvtqnVZmuJ7VguF3PHs1mcerDzvTegHfLfwJ+537bqfS/T60a0zWNctvAC8CqG4Av1Xl3zMdbwCvAijUDeC3GkXgjSEI92rycPM91zeAlxFsV9PeAL6xmvXcN4DXTZnWO4xuAN/QIxRglDeA37Jl6vTHDeB7tgxM1TScG8C3ydBQ/jrVOd4Avrfi2DR6P2mMdN8Avm0P0n8MvtkpgOhuAL8AYYzSAr0RcrkBOV3/ATKluD1CUdqLAAAAAElFTkSuQmCC";

// Icon Produce LLC brand palette (from the official brand manual)
const BRAND_PURPLE = "#5F2F9D";        // Primary brand purple
const BRAND_PURPLE_MID = "#844ECA";    // Medium purple — accents
const BRAND_PURPLE_LIGHT = "#C8B0E7";  // Light purple — soft backgrounds
const BRAND_PURPLE_BG = "#F0E5FA";     // Very light purple wash
const BRAND_GREEN = "#73A626";          // Brand green — success / positive
const BRAND_GREEN_LIGHT = "#CAFF7A";   // Light green
const BRAND_GREEN_BG = "#E8F2D5";      // Light green wash
const BRAND_YELLOW = "#FFED13";         // Brand yellow — highlights
const BRAND_YELLOW_BG = "#FFFABD";     // Soft yellow wash
const BRAND_CREAM = "#F5F1EA";          // App background
const BRAND_INK = "#1C1B1A";            // Text


// ---------- TRANSLATIONS ----------
const T = {
  en: {
    loading: "Loading…",
    appTitle: "Sales",
    pickRole: "Select your role to enter.",
    salespeople: "Sales reps",
    admin: "Administration",
    managerDashboard: "Manager Dashboard",
    reportsSupervision: "Reports & supervision",
    settings: "Settings",
    repsClients: "Reps & clients",
    back: "Back",
    contacted: "Called",
    orders: "Orders",
    pending: "Pending",
    sms2pmPreview: "Preview of 2:00 PM SMS",
    smsTo: "SMS to",
    smsHi: (name, count) => `Hi ${name}, it's 2:00 PM. You still have ${count} clients to call. Don't forget to text and send price lists.`,
    more: "more",
    toContact: "To contact",
    alreadyContacted: "Already called",
    noClients: "No clients assigned. Go to Settings.",

    // call statuses
    statusOrdered: "Ordered",
    statusNoAnswer: "No answer",
    statusCallback: "Call back",
    statusPriceIssue: "Price issue",
    statusNotInterested: "Not interested",
    statusOther: "Other",
    callOutcomes: "Call outcomes",
    callOutcomesTotal: "total calls",
    callbackPending: "pending callback",
    callbacksPending: "pending callbacks",
    contactedShort: "contacted",

    // Reminders (SMS scheduling)
    smsReminders: "SMS reminders",
    smsRemindersSub: "Schedule reminders with pending client lists",
    newReminder: "New reminder",
    reminderVendor: "Send to",
    noVendorsYet: "No vendors yet",
    noPhone: "no phone",
    vendorNoPhoneWarning: "This vendor hasn't added their phone number yet",
    atSpecificTime: "At specific time",
    inXHours: "In X hours",
    date: "Date",
    time: "Time",
    hoursFromNow: "Hours from now",
    willBeSentAt: "Will be sent at",
    includePendingClients: "Include pending clients",
    includePendingClientsHelp: "Adds list of clients not called today",
    customMessageOptional: "Custom message (optional)",
    customMessagePlaceholder: "Add an extra note for the vendor…",
    messagePreview: "Preview",
    scheduleReminder: "Schedule",
    scheduling: "Scheduling…",
    statusPending: "Pending",
    statusSent: "Sent",
    statusCancelled: "Cancelled",
    statusOverdue: "Overdue",
    sendNowVia: "Ready to send — choose channel",
    cancelReminder: "Cancel",
    noRemindersYet: "No reminders yet. Click 'New reminder' to schedule one.",
    overdueRemindersToSend: "Ready to send",
    upcomingReminders: "Upcoming",
    completedReminders: "Completed",
    twilioComingSoon: "Auto-send via Twilio coming soon.",
    manualSendForNowHelp: "For now, use the buttons to send manually when due.",
    unknownVendor: "Unknown vendor",
    vendorHasNoPhone: "This vendor doesn't have a phone number set",

    // Vendor phone settings
    yourPhoneNumber: "Your phone number",
    noPhoneSet: "No phone set",
    phoneUsedForReminders: "Used for reminders from your manager",
    addPhone: "Add phone",
    saving: "Saving…",

    // Auto-archive feature
    archivedClients: "Archived clients",
    archivedClientsSub: "Clients auto-archived after 3 'not interested'",
    noArchivedClients: "No archived clients",
    archivedAuto: "Auto-archived",
    archivedManually: "Manually archived",
    restore: "Restore",
    notInterestedWarning: "2 of 3 'not interested' — will auto-archive next time",
    clientArchived: "Client auto-archived",
    archiveBadge: "Archived",
    statusOther: "Other note",

    // Close callback
    closeCallback: "Close callback",
    closeCallbackHelp: "What happened with this callback? The original is kept in history.",
    closeAsOrdered: "Already ordered",
    closeAsOrderedHelp: "Client placed the order through another channel",
    closeAsPriceIssue: "Price issue",
    closeAsPriceIssueHelp: "Client raised a price concern",
    closeAsNotInterested: "Not interested anymore",
    closeAsNotInterestedHelp: "Client is no longer interested",
    closeAsCancel: "Cancel callback",
    closeAsCancelHelp: "Not contacted yet — just close it",
    unknownClient: "Unknown client",
    noActivityYet: "No activity yet",
    scheduledFor: "Scheduled",

    // Removal requests
    requestRemoval: "Request removal",
    requestRemovalConfirm: "Request manager to remove this client?",
    removalPendingApproval: "Removal pending manager approval",
    cancelRequest: "Cancel",
    removalRequests: "Removal requests",
    removalRequestsSub: "Vendors asking to remove clients from their list",
    noRemovalRequests: "No removal requests pending",
    requestedBy: "Requested by",
    assignedTo: "Assigned to",
    interaction: "interaction",
    interactions: "interactions",
    onRecord: "on record",
    reject: "Reject",
    approveRemoval: "Approve & archive",
    requestPending: "request pending",
    requestsPending: "requests pending",

    // Quick add task
    quickAddTask: "Quick add task",
    taskTitle: "Title",
    taskTitlePlaceholder: "Task title…",
    dueDate: "Due date",
    assignToVendor: "Assign to vendor",
    optional: "optional",
    unassigned: "Unassigned",
    relatedClient: "Related client",
    noneSelected: "None",
    notesOptional: "Notes",
    taskNotePlaceholder: "Additional details…",
    createTask: "Create task",
    openTask: "open task",
    openTasks: "open tasks",
    noTasks: "No active tasks",

    // Sales Insights
    salesInsights: "Sales Insights",
    salesInsightsTagline: "See who orders on which days",
    salesInsightsSub: "Track your customer ordering patterns across all history",
    salesInsightsTeamSub: "Team-wide ordering patterns",
    weeklyReport: "Weekly Report",
    weeklyReportSub: "Download last 7 days as PDF",
    generatingPdf: "Generating PDF…",
    fullTeam: "Full team report",
    individual: "Individual",
    executiveSummary: "Executive Summary",
    calls: "Calls",
    uniqueContacted: "Unique contacted",
    uniqueOrdered: "Unique ordered",
    vsLastWeek: "vs. last week",
    moreOrders: "more orders",
    fewerOrders: "fewer orders",
    same: "same as last week",
    dayByDayActivity: "Day-by-day activity",
    vendorRanking: "Vendor ranking",
    topClients: "Top performing clients",
    topClientsHelper: "Most orders placed this week",
    atRiskClients: "At-risk clients",
    atRiskHelper: "Ordered last week but not this week — worth reaching out",
    outstandingTasks: "Outstanding tasks",
    overdue: "Overdue",
    dueToday: "Due today",
    upcoming: "Upcoming",
    interactionBreakdown: "Interaction breakdown",
    clientActivityTitle: "Client Activity Appendix",
    clientActivitySub: "Per-client breakdown for the week (sorted by orders)",
    allClientsTable: "All clients summary",
    top10Detail: "Top 10 most active — detailed timeline",
    noActivity: "No activity",
    noActiveClientsThisWeek: "No active clients this week",
    timeline: "Timeline",
    callSingular: "call",
    conversion: "conversion",
    shortOrdered: "Order",
    shortCallback: "Callback",
    shortNoAnswer: "No ans.",
    shortNotInt: "Not int.",
    shortPriceIssue: "Price",
    shortOther: "Other",
    shortSent: "Sent",
    addClient: "Add client",
    addLead: "Add lead",
    addVendor: "Add vendor",
    clientName: "Client name",
    clientNamePlaceholder: "e.g. Sunrise Distribution",
    clientPhonePlaceholder: "305-555-1234",
    assignedVendor: "Assigned vendor",
    vendorRequired: "Please assign a vendor",
    nameRequired: "Name is required",
    frequency: "Frequency",
    frequencyDaily: "Daily",
    frequencyWeekly: "Weekly",
    frequencyBiweekly: "Biweekly",
    frequencyMonthly: "Monthly",
    notes: "Notes",
    notesPlaceholder: "Optional context, preferences, etc.",
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    leadName: "Lead name",
    leadNamePlaceholder: "e.g. Mike's Pizza",
    leadNotesPlaceholder: "Where did this lead come from? Any context?",
    addLeadHelper: "Add a prospect that needs to be approved and assigned to a vendor.",
    addVendorInfo1: "To add a new vendor to your team, share your CRM signup link with them:",
    addVendorInfo2: "When they sign up, you'll get a notification in the home screen to approve them. After approval they'll appear in your vendor list and can start receiving clients.",
    copySignupLink: "Copy signup link",
    generatedOn: "Generated on",
    page: "Page",
    order: "order",
    viewingFor: "Viewing for",
    allVendors: "All vendors",
    showingDataFor: "Showing data for",
    loading: "Loading…",
    notEnoughData: "Not enough data yet",
    notEnoughDataSub: "Patterns appear after a few weeks of consistent use. Keep logging orders!",
    byDay: "By day",
    byCustomer: "By customer",
    trends: "Trends",
    selectDay: "Select day",
    patternFor: "Pattern for",
    recurringClient: "recurring client",
    recurringClients: "recurring clients",
    noRecurringPatterns: "No patterns yet",
    todayProgress: "Today's progress",
    orderedToday: "Ordered today",
    stronglyRecurring: "Strong pattern (3+ of 4)",
    mildlyRecurring: "Mild pattern (2 of 4)",
    atRisk: "At risk — used to order this day",
    noPatternsForDay: "No customers with ordering patterns for this day yet",
    lastOrder: "Last order",
    yesterday: "yesterday",
    daysAgo: "days ago",
    orderedLastTime: "ordered last time",
    last4Weeks: "Last 4 weeks",
    inLast4Weeks: "across full history",
    totalOrder: "total order",
    totalOrders: "total orders",
    summary: "Summary",
    withOrderHistory: "with order history",
    noRecentOrders: "No recent orders",
    andMore: "and",
    more: "more",
    order: "order",
    orders: "orders",
    mostly: "mostly",
    every: "every",
    days: "days",
    dayOfWeekDistribution: "By day of week",
    ordersByDay: "Orders by day of week",
    strongestDay: "Strongest day",
    ofYourOrders: "of your orders",

    // not interested reasons
    whyNotInterested: "Why not interested?",
    reasonHasVendor: "We already have a vendor",
    reasonDontSell: "We don't sell this product",
    reasonStocked: "Already stocked",
    reasonClosed: "Closed / on vacation",
    reasonOther: "Other reason",
    writeReason: "Write reason…",

    // callback
    callbackTime: "Callback time",
    pickTime: "Pick time",
    reminderInfo: (t) => `Reminder will be sent at ${t} (5 min before)`,
    callbackAt: "Callback at",
    scheduledCallbacks: "Scheduled callback reminders",
    reminderAt: "Reminder at",

    // channels
    callChannel: "Call",
    textChannel: "Text / WhatsApp",
    emailChannel: "Email price list",
    textedDone: "Texted ✓",
    emailedDone: "Price list sent ✓",

    // stats / cards
    briefNote: "Brief note (optional)",
    cancel: "Cancel",
    confirm: "Confirm",
    change: "Change",
    changeTime: "Change time",
    save: "Save",
    dashboard: "Dashboard",
    contactedToday: "Called today",
    textedStat: "Texted",
    emailedStat: "Price list sent",
    contactRate: "Contact rate",
    avgOrders: "Avg orders / rep",
    report4pmPreview: "Preview of 4:00 PM report",
    repsLive: "Reps — live status",
    contactFrequency: "Activity by rep",
    notContacted: "Not called",
    noneContactedYet: "No one called yet",
    allContacted: "All called ✓",
    repsTab: "Sales reps",
    clientsTab: "Clients",
    repName: "Rep name",
    phoneSms: "Phone (for SMS)",
    add: "Add",
    noPhone: "No phone",
    clientName: "Client name",
    phone: "Phone",
    daily: "Daily",
    twiceweek: "2x / week",
    weekly: "Weekly",
    biweekly: "Bi-weekly",
    allClients: "All clients",
    ordersWord: "orders",
    contactsWord: "contacts",
    today: "Today",
    thisWeek: "This week",
    thisMonth: "This month",
    bestSeller: "Top performer",
    recurrentClients: "Recurrent clients",
    recurrentRanking: "Most recurrent clients",
    recurrentDef: "* A recurrent client placed 2 or more orders in this period.",
    activeReps: "Active reps",
    totalCalled: "Clients called",
    clientRanking: "Client ranking",
    clientRankingSub: "Best to worst, by orders in period",
    inactiveClient: "Inactive",
    bestClients: "Best clients",
    worstClients: "Hardest clients",
    repBestWorst: "Best & hardest clients by rep",
    repBestWorstSub: "Tap a rep to see their top performers and the clients who haven't ordered despite contact",

    // Login / auth
    welcomeBack: "Welcome back",
    signInToContinue: "Sign in to continue",
    email: "Email",
    password: "Password",
    emailPlaceholder: "you@iconproduce.com",
    passwordPlaceholder: "Your password",
    signIn: "Sign in",
    invalidCredentials: "Invalid email or password",
    demoAccounts: "Demo accounts (tap to fill)",
    logout: "Log out",
    welcomeUser: (name) => `Welcome, ${name}`,
    admin: "Admin",
    credentialsTab: "Login",
    repsCredentials: "Sales rep accounts",
    adminCredentials: "Admin account",
    edit: "Edit",
    showPassword: "Show",
    hidePassword: "Hide",
    save: "Save",
    pickArea: "What would you like to do?",

    // Sign up + recovery
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    signUp: "Sign up",
    backToLogin: "Back to login",
    forgotPassword: "Forgot password?",
    createAccount: "Create your account",
    createAccountSubtitle: "Join the Icon Produce team",
    fullName: "Full name",
    phoneOptional: "Phone (optional)",
    confirmPasswordLabel: "Confirm password",
    createAccountBtn: "Create account",
    nameRequired: "Name is required",
    emailRequired: "Email is required",
    passwordsDontMatch: "Passwords don't match",
    passwordTooShort: "Password must be at least 6 characters",
    emailAlreadyTaken: "This email is already registered",

    forgotTitle: "Recover access",
    forgotSubtitle: "Reset your password or find your email",
    forgotPwdTab: "Forgot password",
    forgotEmailTab: "Forgot email",
    pwdResetIntro: "Enter your email and we'll let you set a new password",
    emailFindIntro: "Enter your name or phone number to find your email",
    continueBtn: "Continue",
    newPasswordLabel: "New password",
    resetPwdBtn: "Reset password",
    settingPwdFor: (email) => `Setting new password for ${email}`,
    emailNotFound: "We couldn't find an account with that email",
    noMatchesFound: "No accounts match that information",
    foundOneAccount: "Account found:",
    foundManyAccounts: (n) => `${n} accounts found:`,
    contactAdmin: "If you can't find your account, contact your manager",
    findEmailBtn: "Find email",

    // Leads / data entry
    leads: "Leads",
    myLeads: "My leads",
    myCustomers: "My customers",
    newLead: "New lead",
    requestNewLead: "Request new lead",
    requestLeadSubtitle: "Send to manager for approval",
    leadName: "Lead name",
    optionalNote: "Note (optional)",
    submitRequest: "Submit request",
    leadSubmitted: "Request sent to manager",
    pendingApprovals: "Pending approvals",
    pendingApprovalsCount: (n) => `${n} pending approval${n === 1 ? "" : "s"}`,
    approve: "Approve",
    reject: "Reject",
    approveAndAssign: "Approve & assign",
    assignTo: "Assign to",
    pickVendor: "Choose vendor",
    rejectLead: "Reject lead",
    rejectReason: "Reason (visible to creator)",
    confirmReject: "Confirm rejection",
    requestedBy: "Requested by",
    createdBy: "Created by",
    statusPending: "Pending approval",
    statusActive: "Active lead",
    statusRejected: "Rejected",
    statusConverted: "Customer",
    leadHistory: "History",
    convertedToCustomer: "Converted to customer",
    rejectionNotice: "This lead was rejected:",
    pipeline: "Pipeline",
    leadsKanban: "Leads pipeline",
    noLeads: "No leads yet",
    noPending: "No pending requests",
    noActiveLeads: "No active leads",
    noRejected: "No rejected leads",
    addLead: "Add lead",
    leadAddedDirect: "Lead added — assign to a vendor when ready",
    convertNotice: (name) => `${name} placed an order — converted to customer`,

    // Roles
    roleManager: "Manager",
    roleDataEntry: "Data Entry",
    roleVendor: "Sales rep",
    teamAccounts: "Team accounts",
    teamAccountsSub: "Manage data entry staff",
    addDataEntry: "Add data entry user",
    dataEntryHome: "Lead management",
    dataEntryHomeSub: "Add and update leads",

    // Analytics & growth
    period30: "30 days",
    period60: "60 days",
    period90: "90 days",
    period1y: "1 year",
    growth: "My growth",
    conversionLeaderboard: "Lead conversion",
    leadsConverted: "Leads converted",
    activeCustomers: "Active customers",
    starCustomer: "Star customer",
    starCustomerSub: "Most orders this period",
    ordersPerWeek: "Orders per week",
    ordersPerMonth: "Orders per month",
    customerGrowth: "Customer growth",
    cumulativeCustomers: "Total customers acquired",
    thisWeek: "This week",
    lastWeek: "Last week",
    thisMonth: "This month",
    lastMonth: "Last month",
    newCustomers: "New customers",
    newLeadsLabel: "New leads",
    conversionRate: "Conversion rate",
    conversionRateSub: (n, d) => `${n} of ${d} leads converted`,
    vsLastWeek: "vs last week",
    vsLastMonth: "vs last month",
    growthLoading: "Loading data…",
    week: "Week",
    month: "Month",
    topClient: "Top client",
    loadingReport: "Loading report…",
    noActivity: "No activity yet",

    // Templates (Priority 1)
    templates: "Message templates",
    templatesTab: "Templates",
    templatesSub: "Quick-send messages with one tap",
    templateTitle: "Title",
    templateBody: "Message",
    addTemplate: "Add template",
    editTemplate: "Edit template",
    deleteTemplate: "Delete",
    templatePlaceholderName: "Use {name} for the client's name",
    sendTemplate: "Send",
    pickTemplate: "Pick a template",
    sendVia: "Send via",
    sendViaSms: "SMS",
    sendViaWhatsApp: "WhatsApp",
    sendViaEmail: "Email",
    noTemplates: "No templates yet",

    // Tasks (Priority 2)
    tasks: "Tasks",
    myTasks: "My tasks",
    upcomingTasks: "Upcoming tasks",
    overdueTasks: "Overdue",
    todayTasks: "Today",
    thisWeekTasks: "This week",
    laterTasks: "Later",
    completedTasks: "Completed",
    addTask: "Add task",
    newTask: "New task",
    taskTitle: "What to do",
    taskClient: "Related client (optional)",
    taskDate: "Due date",
    taskTime: "Due time (optional)",
    taskNote: "Note (optional)",
    saveTask: "Save task",
    completeTask: "Mark complete",
    deleteTask: "Delete task",
    noTasks: "No tasks yet",
    noUpcoming: "No upcoming tasks",
    taskFor: "Task for",
    taskOverdue: "Overdue",
    pickClient: "Pick client",
    noClient: "No client (general task)",
    taskCreated: "Task created",
    nDueToday: (n) => `${n} due today`,
    nOverdue: (n) => `${n} overdue`,

    // History (Priority 3)
    history: "History",
    fullHistory: "Full history",
    historyEmpty: "No history yet",
    addNote: "Add note",
    saveNote: "Save",
    longNote: "Note",
    longNotePlaceholder: "Write a longer note about this client…",
    quickNotes: "Quick notes",
    notesAndHistory: "Notes & history",

    // Quotas (Priority 4)
    quota: "Quota",
    quotas: "Quotas",
    quotasTab: "Quotas",
    quotasSub: "Set monthly targets per rep",
    monthlyQuota: "Monthly quota",
    ordersGoal: "Orders goal",
    callsGoal: "Calls goal",
    progress: "Progress",
    quotaProgress: "Quota progress",
    yourGoal: "Your goal",
    ordersDone: (n, total) => `${n} of ${total} orders`,
    callsDone: (n, total) => `${n} of ${total} calls`,
    quotaMet: "Goal achieved 🎉",
    quotaAhead: "Ahead of pace",
    quotaOnPace: "On pace",
    quotaBehind: "Behind pace",
    daysLeftMonth: (n) => `${n} days left this month`,
    setQuota: "Set quota",
    saveQuota: "Save",
    quotaTeamView: "Team quotas",

    // Tags (Priority 5)
    tags: "Tags",
    tagsTab: "Tags",
    tagsSub: "Custom labels for clients",
    addTag: "Add tag",
    tagLabel: "Label",
    tagColor: "Color",
    saveTag: "Save",
    deleteTag: "Delete",
    filterByTag: "Filter by tag",
    allTags: "All",
    noTags: "No tags",
    untagged: "Untagged",

    locale: "en",
  },
  es: {
    loading: "Cargando…",
    appTitle: "Ventas",
    pickRole: "Selecciona tu rol para entrar.",
    salespeople: "Vendedores",
    admin: "Administración",
    managerDashboard: "Dashboard del Jefe",
    reportsSupervision: "Reportes y supervisión",
    settings: "Configuración",
    repsClients: "Vendedores y clientes",
    back: "Volver",
    contacted: "Llamados",
    orders: "Órdenes",
    pending: "Pendientes",
    sms2pmPreview: "Vista previa del SMS de las 2:00 PM",
    smsTo: "SMS a",
    smsHi: (name, count) => `Hola ${name}, son las 2:00 PM. Te faltan ${count} clientes por llamar. No olvides enviar mensaje y la lista de precios.`,
    more: "más",
    toContact: "Por contactar",
    alreadyContacted: "Ya llamados",
    noClients: "No tienes clientes asignados. Ve a Configuración.",

    statusOrdered: "Ordenó",
    statusNoAnswer: "No contestó",
    statusCallback: "Llamar después",
    statusPriceIssue: "Tema de precio",
    statusNotInterested: "No le interesa",
    statusOther: "Otro",
    callOutcomes: "Resultado de llamadas",
    callOutcomesTotal: "llamadas totales",
    callbackPending: "callback pendiente",
    callbacksPending: "callbacks pendientes",
    contactedShort: "contactados",

    // Reminders (SMS scheduling)
    smsReminders: "Recordatorios SMS",
    smsRemindersSub: "Programar recordatorios con lista de clientes pendientes",
    newReminder: "Nuevo recordatorio",
    reminderVendor: "Enviar a",
    noVendorsYet: "Sin vendedores",
    noPhone: "sin teléfono",
    vendorNoPhoneWarning: "Este vendedor no ha agregado su número aún",
    atSpecificTime: "A una hora específica",
    inXHours: "En X horas",
    date: "Fecha",
    time: "Hora",
    hoursFromNow: "Horas desde ahora",
    willBeSentAt: "Se enviará a las",
    includePendingClients: "Incluir clientes pendientes",
    includePendingClientsHelp: "Agrega lista de clientes sin llamada hoy",
    customMessageOptional: "Mensaje personalizado (opcional)",
    customMessagePlaceholder: "Agrega una nota extra para el vendedor…",
    messagePreview: "Vista previa",
    scheduleReminder: "Programar",
    scheduling: "Programando…",
    statusPending: "Pendiente",
    statusSent: "Enviado",
    statusCancelled: "Cancelado",
    statusOverdue: "Atrasado",
    sendNowVia: "Listo para enviar — elige canal",
    cancelReminder: "Cancelar",
    noRemindersYet: "Sin recordatorios. Haz click en 'Nuevo recordatorio' para programar.",
    overdueRemindersToSend: "Listos para enviar",
    upcomingReminders: "Próximos",
    completedReminders: "Completados",
    twilioComingSoon: "Envío automático con Twilio próximamente.",
    manualSendForNowHelp: "Por ahora, usa los botones para enviar manualmente.",
    unknownVendor: "Vendedor desconocido",
    vendorHasNoPhone: "Este vendedor no tiene teléfono registrado",

    // Vendor phone settings
    yourPhoneNumber: "Tu número de teléfono",
    noPhoneSet: "Sin teléfono",
    phoneUsedForReminders: "Para recordatorios de tu manager",
    addPhone: "Agregar teléfono",
    saving: "Guardando…",

    // Auto-archive feature
    archivedClients: "Clientes archivados",
    archivedClientsSub: "Clientes auto-archivados después de 3 'no interesa'",
    noArchivedClients: "Sin clientes archivados",
    archivedAuto: "Auto-archivado",
    archivedManually: "Archivado manualmente",
    restore: "Restaurar",
    notInterestedWarning: "2 de 3 'no interesa' — se auto-archivará la próxima",
    clientArchived: "Cliente auto-archivado",
    archiveBadge: "Archivado",
    statusOther: "Otra nota",

    // Close callback
    closeCallback: "Cerrar callback",
    closeCallbackHelp: "¿Qué pasó con este callback? El original queda en el historial.",
    closeAsOrdered: "Ya ordenó",
    closeAsOrderedHelp: "El cliente ordenó por otro canal",
    closeAsPriceIssue: "Tema de precio",
    closeAsPriceIssueHelp: "El cliente expresó un problema con el precio",
    closeAsNotInterested: "Ya no le interesa",
    closeAsNotInterestedHelp: "El cliente ya no está interesado",
    closeAsCancel: "Cancelar callback",
    closeAsCancelHelp: "No se ha contactado — solo cerrarlo",
    unknownClient: "Cliente desconocido",
    noActivityYet: "Sin actividad",
    scheduledFor: "Programado",

    // Removal requests
    requestRemoval: "Pedir remoción",
    requestRemovalConfirm: "¿Pedir al manager remover este cliente?",
    removalPendingApproval: "Remoción pendiente de aprobación",
    cancelRequest: "Cancelar",
    removalRequests: "Solicitudes de remoción",
    removalRequestsSub: "Vendedores pidiendo remover clientes de su lista",
    noRemovalRequests: "Sin solicitudes pendientes",
    requestedBy: "Solicitado por",
    assignedTo: "Asignado a",
    interaction: "interacción",
    interactions: "interacciones",
    onRecord: "en registro",
    reject: "Rechazar",
    approveRemoval: "Aprobar y archivar",
    requestPending: "solicitud pendiente",
    requestsPending: "solicitudes pendientes",

    // Quick add task
    quickAddTask: "Agregar tarea rápida",
    taskTitle: "Título",
    taskTitlePlaceholder: "Título de la tarea…",
    dueDate: "Fecha límite",
    assignToVendor: "Asignar a vendedor",
    optional: "opcional",
    unassigned: "Sin asignar",
    relatedClient: "Cliente relacionado",
    noneSelected: "Ninguno",
    notesOptional: "Notas",
    taskNotePlaceholder: "Detalles adicionales…",
    createTask: "Crear tarea",
    openTask: "tarea abierta",
    openTasks: "tareas abiertas",
    noTasks: "Sin tareas activas",

    // Sales Insights
    salesInsights: "Análisis de Ventas",
    salesInsightsTagline: "Ver quién ordena qué días",
    salesInsightsSub: "Sigue los patrones de pedidos de tus clientes en todo el historial",
    salesInsightsTeamSub: "Patrones de pedidos del equipo completo",
    weeklyReport: "Reporte Semanal",
    weeklyReportSub: "Descarga los últimos 7 días como PDF",
    generatingPdf: "Generando PDF…",
    fullTeam: "Reporte del equipo completo",
    individual: "Individual",
    executiveSummary: "Resumen Ejecutivo",
    calls: "Llamadas",
    uniqueContacted: "Contactados únicos",
    uniqueOrdered: "Ordenaron únicos",
    vsLastWeek: "vs. semana pasada",
    moreOrders: "más pedidos",
    fewerOrders: "menos pedidos",
    same: "igual que la semana pasada",
    dayByDayActivity: "Actividad día por día",
    vendorRanking: "Ranking de vendedores",
    topClients: "Mejores clientes",
    topClientsHelper: "Más pedidos esta semana",
    atRiskClients: "Clientes en riesgo",
    atRiskHelper: "Ordenaron la semana pasada pero no esta — vale la pena contactar",
    outstandingTasks: "Tareas pendientes",
    overdue: "Vencidas",
    dueToday: "Para hoy",
    upcoming: "Próximas",
    interactionBreakdown: "Desglose de interacciones",
    clientActivityTitle: "Anexo: Actividad por Cliente",
    clientActivitySub: "Desglose por cliente de la semana (ordenado por pedidos)",
    allClientsTable: "Resumen de todos los clientes",
    top10Detail: "Top 10 más activos — línea de tiempo detallada",
    noActivity: "Sin actividad",
    noActiveClientsThisWeek: "Sin clientes activos esta semana",
    timeline: "Línea de tiempo",
    callSingular: "llamada",
    conversion: "conversión",
    shortOrdered: "Pedido",
    shortCallback: "Devol.",
    shortNoAnswer: "No cont.",
    shortNotInt: "No int.",
    shortPriceIssue: "Precio",
    shortOther: "Otro",
    shortSent: "Env.",
    addClient: "Agregar cliente",
    addLead: "Agregar lead",
    addVendor: "Agregar vendedor",
    clientName: "Nombre del cliente",
    clientNamePlaceholder: "ej. Distribuidora Sunrise",
    clientPhonePlaceholder: "305-555-1234",
    assignedVendor: "Vendedor asignado",
    vendorRequired: "Por favor asigna un vendedor",
    nameRequired: "El nombre es obligatorio",
    frequency: "Frecuencia",
    frequencyDaily: "Diaria",
    frequencyWeekly: "Semanal",
    frequencyBiweekly: "Quincenal",
    frequencyMonthly: "Mensual",
    notes: "Notas",
    notesPlaceholder: "Contexto opcional, preferencias, etc.",
    save: "Guardar",
    cancel: "Cancelar",
    close: "Cerrar",
    leadName: "Nombre del lead",
    leadNamePlaceholder: "ej. Pizzería Mike's",
    leadNotesPlaceholder: "¿De dónde vino este lead? ¿Algún contexto?",
    addLeadHelper: "Agrega un prospecto que necesita ser aprobado y asignado a un vendedor.",
    addVendorInfo1: "Para agregar un nuevo vendedor a tu equipo, comparte tu link de registro:",
    addVendorInfo2: "Cuando se registren, recibirás una notificación en la pantalla principal para aprobarlos. Después de aprobarlos aparecerán en tu lista de vendedores y podrán empezar a recibir clientes.",
    copySignupLink: "Copiar link de registro",
    generatedOn: "Generado el",
    page: "Página",
    order: "pedido",
    viewingFor: "Ver datos de",
    allVendors: "Todo el equipo",
    showingDataFor: "Mostrando datos de",
    loading: "Cargando…",
    notEnoughData: "Aún no hay suficientes datos",
    notEnoughDataSub: "Los patrones aparecen después de unas semanas de uso constante. ¡Sigue registrando pedidos!",
    byDay: "Por día",
    byCustomer: "Por cliente",
    trends: "Tendencias",
    selectDay: "Selecciona día",
    patternFor: "Patrón para",
    recurringClient: "cliente recurrente",
    recurringClients: "clientes recurrentes",
    noRecurringPatterns: "Sin patrones aún",
    todayProgress: "Progreso de hoy",
    orderedToday: "Ordenaron hoy",
    stronglyRecurring: "Patrón fuerte (3+ de 4)",
    mildlyRecurring: "Patrón leve (2 de 4)",
    atRisk: "En riesgo — solían ordenar este día",
    noPatternsForDay: "Aún no hay clientes con patrones de pedido para este día",
    lastOrder: "Último pedido",
    yesterday: "ayer",
    daysAgo: "días atrás",
    orderedLastTime: "ordenó la vez pasada",
    last4Weeks: "Últimas 4 semanas",
    inLast4Weeks: "en todo el historial",
    totalOrder: "pedido total",
    totalOrders: "pedidos totales",
    summary: "Resumen",
    withOrderHistory: "con historial de pedidos",
    noRecentOrders: "Sin pedidos recientes",
    andMore: "y",
    more: "más",
    order: "pedido",
    orders: "pedidos",
    mostly: "principalmente",
    every: "cada",
    days: "días",
    dayOfWeekDistribution: "Por día de la semana",
    ordersByDay: "Pedidos por día de la semana",
    strongestDay: "Día más fuerte",
    ofYourOrders: "de tus pedidos",

    whyNotInterested: "¿Por qué no le interesa?",
    reasonHasVendor: "Ya tenemos proveedor",
    reasonDontSell: "No vendemos este producto",
    reasonStocked: "Ya tiene mercancía",
    reasonClosed: "Cerrado / vacaciones",
    reasonOther: "Otra razón",
    writeReason: "Escribe la razón…",

    callbackTime: "Hora para llamar",
    pickTime: "Elige la hora",
    reminderInfo: (t) => `Recordatorio se enviará a las ${t} (5 min antes)`,
    callbackAt: "Llamar a las",
    scheduledCallbacks: "Recordatorios de llamadas programadas",
    reminderAt: "Recordatorio a las",

    callChannel: "Llamada",
    textChannel: "Mensaje / WhatsApp",
    emailChannel: "Email lista de precios",
    textedDone: "Mensaje ✓",
    emailedDone: "Lista enviada ✓",

    briefNote: "Detalle breve (opcional)",
    cancel: "Cancelar",
    confirm: "Confirmar",
    change: "Cambiar",
    changeTime: "Cambiar hora",
    save: "Guardar",
    dashboard: "Dashboard",
    contactedToday: "Llamados hoy",
    textedStat: "Con mensaje",
    emailedStat: "Lista enviada",
    contactRate: "Tasa de llamada",
    avgOrders: "Órdenes prom / vend",
    report4pmPreview: "Vista previa del reporte de las 4:00 PM",
    repsLive: "Vendedores — en vivo",
    contactFrequency: "Actividad por vendedor",
    notContacted: "No llamados",
    noneContactedYet: "Nadie llamado todavía",
    allContacted: "Todos llamados ✓",
    repsTab: "Vendedores",
    clientsTab: "Clientes",
    repName: "Nombre del vendedor",
    phoneSms: "Teléfono (para SMS)",
    add: "Agregar",
    noPhone: "Sin teléfono",
    clientName: "Nombre del cliente",
    phone: "Teléfono",
    daily: "Diario",
    twiceweek: "2x / semana",
    weekly: "Semanal",
    biweekly: "Quincenal",
    allClients: "Todos los clientes",
    ordersWord: "órdenes",
    contactsWord: "contactos",
    today: "Hoy",
    thisWeek: "Esta semana",
    thisMonth: "Este mes",
    bestSeller: "Mejor vendedor",
    recurrentClients: "Clientes recurrentes",
    recurrentRanking: "Más clientes recurrentes",
    recurrentDef: "* Un cliente recurrente hizo 2 o más órdenes en este período.",
    activeReps: "Vendedores activos",
    totalCalled: "Clientes llamados",
    clientRanking: "Ranking de clientes",
    clientRankingSub: "De mejor a peor, por órdenes en el período",
    inactiveClient: "Inactivo",
    bestClients: "Mejores clientes",
    worstClients: "Clientes difíciles",
    repBestWorst: "Mejores y peores clientes por vendedor",
    repBestWorstSub: "Toca un vendedor para ver sus mejores clientes y aquellos que no han ordenado a pesar del contacto",

    // Login / auth
    welcomeBack: "Bienvenido",
    signInToContinue: "Inicia sesión para continuar",
    email: "Correo",
    password: "Contraseña",
    emailPlaceholder: "tu@iconproduce.com",
    passwordPlaceholder: "Tu contraseña",
    signIn: "Iniciar sesión",
    invalidCredentials: "Correo o contraseña inválidos",
    demoAccounts: "Cuentas de prueba (toca para llenar)",
    logout: "Cerrar sesión",
    welcomeUser: (name) => `Hola, ${name}`,
    admin: "Jefe",
    credentialsTab: "Login",
    repsCredentials: "Cuentas de vendedores",
    adminCredentials: "Cuenta del Jefe",
    edit: "Editar",
    showPassword: "Ver",
    hidePassword: "Ocultar",
    save: "Guardar",
    pickArea: "¿Qué deseas hacer?",

    // Sign up + recovery
    noAccount: "¿No tienes cuenta?",
    haveAccount: "¿Ya tienes cuenta?",
    signUp: "Crear cuenta",
    backToLogin: "Volver al login",
    forgotPassword: "¿Olvidaste tu contraseña?",
    createAccount: "Crea tu cuenta",
    createAccountSubtitle: "Únete al equipo de Icon Produce",
    fullName: "Nombre completo",
    phoneOptional: "Teléfono (opcional)",
    confirmPasswordLabel: "Confirmar contraseña",
    createAccountBtn: "Crear cuenta",
    nameRequired: "El nombre es requerido",
    emailRequired: "El correo es requerido",
    passwordsDontMatch: "Las contraseñas no coinciden",
    passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
    emailAlreadyTaken: "Este correo ya está registrado",

    forgotTitle: "Recuperar acceso",
    forgotSubtitle: "Restablece tu contraseña o encuentra tu correo",
    forgotPwdTab: "Contraseña",
    forgotEmailTab: "Correo",
    pwdResetIntro: "Ingresa tu correo y podrás crear una nueva contraseña",
    emailFindIntro: "Ingresa tu nombre o teléfono para encontrar tu correo",
    continueBtn: "Continuar",
    newPasswordLabel: "Nueva contraseña",
    resetPwdBtn: "Restablecer contraseña",
    settingPwdFor: (email) => `Configurando nueva contraseña para ${email}`,
    emailNotFound: "No encontramos una cuenta con ese correo",
    noMatchesFound: "No se encontraron cuentas con esa información",
    foundOneAccount: "Cuenta encontrada:",
    foundManyAccounts: (n) => `${n} cuentas encontradas:`,
    contactAdmin: "Si no encuentras tu cuenta, contacta a tu jefe",
    findEmailBtn: "Buscar correo",

    // Leads / data entry
    leads: "Leads",
    myLeads: "Mis leads",
    myCustomers: "Mis clientes",
    newLead: "Nuevo lead",
    requestNewLead: "Solicitar nuevo lead",
    requestLeadSubtitle: "Enviar al jefe para aprobación",
    leadName: "Nombre del lead",
    optionalNote: "Nota (opcional)",
    submitRequest: "Enviar solicitud",
    leadSubmitted: "Solicitud enviada al jefe",
    pendingApprovals: "Pendientes de aprobación",
    pendingApprovalsCount: (n) => `${n} pendiente${n === 1 ? "" : "s"} de aprobación`,
    approve: "Aprobar",
    reject: "Rechazar",
    approveAndAssign: "Aprobar y asignar",
    assignTo: "Asignar a",
    pickVendor: "Elige vendedor",
    rejectLead: "Rechazar lead",
    rejectReason: "Razón (visible para quien lo creó)",
    confirmReject: "Confirmar rechazo",
    requestedBy: "Solicitado por",
    createdBy: "Creado por",
    statusPending: "Pendiente de aprobación",
    statusActive: "Lead activo",
    statusRejected: "Rechazado",
    statusConverted: "Cliente",
    leadHistory: "Historial",
    convertedToCustomer: "Convertido a cliente",
    rejectionNotice: "Este lead fue rechazado:",
    pipeline: "Pipeline",
    leadsKanban: "Pipeline de leads",
    noLeads: "Aún no hay leads",
    noPending: "Sin solicitudes pendientes",
    noActiveLeads: "Sin leads activos",
    noRejected: "Sin leads rechazados",
    addLead: "Agregar lead",
    leadAddedDirect: "Lead agregado — asigna a un vendedor cuando esté listo",
    convertNotice: (name) => `${name} hizo una orden — convertido a cliente`,

    // Roles
    roleManager: "Jefe",
    roleDataEntry: "Captura de Datos",
    roleVendor: "Vendedor",
    teamAccounts: "Cuentas del equipo",
    teamAccountsSub: "Gestionar personal de captura",
    addDataEntry: "Agregar usuario de captura",
    dataEntryHome: "Gestión de leads",
    dataEntryHomeSub: "Agregar y actualizar leads",

    // Analytics & growth
    period30: "30 días",
    period60: "60 días",
    period90: "90 días",
    period1y: "1 año",
    growth: "Mi crecimiento",
    conversionLeaderboard: "Conversión de leads",
    leadsConverted: "Leads convertidos",
    activeCustomers: "Clientes activos",
    starCustomer: "Cliente estrella",
    starCustomerSub: "Más órdenes en el período",
    ordersPerWeek: "Órdenes por semana",
    ordersPerMonth: "Órdenes por mes",
    customerGrowth: "Crecimiento de clientes",
    cumulativeCustomers: "Total de clientes adquiridos",
    thisWeek: "Esta semana",
    lastWeek: "Semana pasada",
    thisMonth: "Este mes",
    lastMonth: "Mes pasado",
    newCustomers: "Clientes nuevos",
    newLeadsLabel: "Leads nuevos",
    conversionRate: "Tasa de conversión",
    conversionRateSub: (n, d) => `${n} de ${d} leads convertidos`,
    vsLastWeek: "vs semana pasada",
    vsLastMonth: "vs mes pasado",
    growthLoading: "Cargando datos…",
    week: "Sem",
    month: "Mes",
    topClient: "Mejor cliente",
    loadingReport: "Cargando reporte…",
    noActivity: "Sin actividad",

    // Templates (Prioridad 1)
    templates: "Plantillas de mensajes",
    templatesTab: "Plantillas",
    templatesSub: "Mensajes rápidos con un tap",
    templateTitle: "Título",
    templateBody: "Mensaje",
    addTemplate: "Agregar plantilla",
    editTemplate: "Editar plantilla",
    deleteTemplate: "Eliminar",
    templatePlaceholderName: "Usa {name} para el nombre del cliente",
    sendTemplate: "Enviar",
    pickTemplate: "Elige una plantilla",
    sendVia: "Enviar por",
    sendViaSms: "SMS",
    sendViaWhatsApp: "WhatsApp",
    sendViaEmail: "Email",
    noTemplates: "Aún no hay plantillas",

    // Tasks (Prioridad 2)
    tasks: "Tareas",
    myTasks: "Mis tareas",
    upcomingTasks: "Tareas próximas",
    overdueTasks: "Vencidas",
    todayTasks: "Hoy",
    thisWeekTasks: "Esta semana",
    laterTasks: "Después",
    completedTasks: "Completadas",
    addTask: "Agregar tarea",
    newTask: "Nueva tarea",
    taskTitle: "Qué hacer",
    taskClient: "Cliente relacionado (opcional)",
    taskDate: "Fecha",
    taskTime: "Hora (opcional)",
    taskNote: "Nota (opcional)",
    saveTask: "Guardar tarea",
    completeTask: "Marcar lista",
    deleteTask: "Eliminar tarea",
    noTasks: "Aún no hay tareas",
    noUpcoming: "No hay tareas próximas",
    taskFor: "Tarea para",
    taskOverdue: "Vencida",
    pickClient: "Elige cliente",
    noClient: "Sin cliente (tarea general)",
    taskCreated: "Tarea creada",
    nDueToday: (n) => `${n} para hoy`,
    nOverdue: (n) => `${n} vencidas`,

    // History (Prioridad 3)
    history: "Historial",
    fullHistory: "Historial completo",
    historyEmpty: "Aún no hay historial",
    addNote: "Agregar nota",
    saveNote: "Guardar",
    longNote: "Nota",
    longNotePlaceholder: "Escribe una nota más larga sobre este cliente…",
    quickNotes: "Notas rápidas",
    notesAndHistory: "Notas e historial",

    // Quotas (Prioridad 4)
    quota: "Meta",
    quotas: "Metas",
    quotasTab: "Metas",
    quotasSub: "Definir metas mensuales por vendedor",
    monthlyQuota: "Meta mensual",
    ordersGoal: "Meta de órdenes",
    callsGoal: "Meta de llamadas",
    progress: "Progreso",
    quotaProgress: "Progreso de meta",
    yourGoal: "Tu meta",
    ordersDone: (n, total) => `${n} de ${total} órdenes`,
    callsDone: (n, total) => `${n} de ${total} llamadas`,
    quotaMet: "¡Meta alcanzada! 🎉",
    quotaAhead: "Adelantado",
    quotaOnPace: "En ritmo",
    quotaBehind: "Atrasado",
    daysLeftMonth: (n) => `${n} días restantes en el mes`,
    setQuota: "Definir meta",
    saveQuota: "Guardar",
    quotaTeamView: "Metas del equipo",

    // Tags (Prioridad 5)
    tags: "Etiquetas",
    tagsTab: "Etiquetas",
    tagsSub: "Etiquetas personalizadas para clientes",
    addTag: "Agregar etiqueta",
    tagLabel: "Nombre",
    tagColor: "Color",
    saveTag: "Guardar",
    deleteTag: "Eliminar",
    filterByTag: "Filtrar por etiqueta",
    allTags: "Todos",
    noTags: "Sin etiquetas",
    untagged: "Sin etiqueta",

    locale: "es",
  },
};

// ---------- CONSTANTS ----------
const STATUS_KEYS = ["ordered", "no_answer", "callback", "price_issue", "not_interested", "other"];
const STATUS_META = {
  ordered: { color: "#73A626", bg: "#E8F2D5", icon: CheckCircle2 },
  no_answer: { color: "#8B7355", bg: "#F0EAE0", icon: PhoneOff },
  callback: { color: "#5A6B85", bg: "#E5EAF2", icon: Clock },
  price_issue: { color: "#B8860B", bg: "#FAF0D7", icon: DollarSign },
  not_interested: { color: "#9C5757", bg: "#F2E2E2", icon: XCircle },
  other: { color: "#5A4A6B", bg: "#EAE3F0", icon: StickyNote },
};
const NOT_INTERESTED_REASONS = ["has_vendor", "dont_sell", "stocked", "closed", "other_reason"];

function statusLabel(key, t) {
  return {
    ordered: t.statusOrdered, no_answer: t.statusNoAnswer, callback: t.statusCallback,
    price_issue: t.statusPriceIssue, not_interested: t.statusNotInterested, other: t.statusOther,
  }[key];
}
function reasonLabel(key, t) {
  return {
    has_vendor: t.reasonHasVendor, dont_sell: t.reasonDontSell, stocked: t.reasonStocked,
    closed: t.reasonClosed, other_reason: t.reasonOther,
  }[key];
}
function freqLabel(f, t) {
  const map = {
    daily: t.daily, diario: t.daily, twiceweek: t.twiceweek, "2x semana": t.twiceweek,
    weekly: t.weekly, semanal: t.weekly, biweekly: t.biweekly, quincenal: t.biweekly,
  };
  return map[f] || f;
}
function chOf(i) { return i.channel || "call"; }
function subtractMin(timeStr, mins) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  let total = h * 60 + m - mins;
  if (total < 0) total = 0;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

// ---------- SEED ----------
const SEED_VENDORS = [
  { id: "v1", name: "Carlos M.", phone: "+1 555-0101", email: "carlos.m@iconproduce.com", password: "carlos123" },
  { id: "v2", name: "Ana R.", phone: "+1 555-0102", email: "ana.r@iconproduce.com", password: "ana123" },
  { id: "v3", name: "Miguel S.", phone: "+1 555-0103", email: "miguel.s@iconproduce.com", password: "miguel123" },
  { id: "v4", name: "Laura P.", phone: "+1 555-0104", email: "laura.p@iconproduce.com", password: "laura123" },
];
const SEED_CLIENTS = [
  { id: "c1", name: "Sunrise Distribution", phone: "+1 555-0201", vendorId: "v1", frequency: "daily", tags: ["vip"] },
  { id: "c2", name: "Central Market", phone: "+1 555-0202", vendorId: "v1", frequency: "daily", tags: [] },
  { id: "c3", name: "Corner Store", phone: "+1 555-0203", vendorId: "v1", frequency: "twiceweek", tags: ["pays_late"] },
  { id: "c4", name: "Pérez Wholesale", phone: "+1 555-0204", vendorId: "v2", frequency: "daily", tags: ["vip"] },
  { id: "c5", name: "San Juan Bodega", phone: "+1 555-0205", vendorId: "v2", frequency: "daily", tags: [] },
  { id: "c6", name: "Family Super", phone: "+1 555-0206", vendorId: "v2", frequency: "weekly", tags: ["difficult"] },
  { id: "c7", name: "Northside Supply", phone: "+1 555-0207", vendorId: "v3", frequency: "daily", tags: [] },
  { id: "c8", name: "García Distributors", phone: "+1 555-0208", vendorId: "v3", frequency: "twiceweek", tags: ["discount"] },
  { id: "c9", name: "Andina Trading", phone: "+1 555-0209", vendorId: "v4", frequency: "daily", tags: ["vip"] },
  { id: "c10", name: "24h Mini Market", phone: "+1 555-0210", vendorId: "v4", frequency: "daily", tags: [] },
];

const SEED_TEMPLATES = [
  { id: "t1", title: "Daily order check", body: "Hi {name}, would you like your usual order today?", channel: "any" },
  { id: "t2", title: "Updated price list", body: "Hi {name}, here's our updated price list. Let me know if you have any questions.", channel: "any" },
  { id: "t3", title: "Order follow-up", body: "Hi {name}, just wanted to confirm you received your last order. Everything OK?", channel: "any" },
  { id: "t4", title: "Re-engagement", body: "Hi {name}, it's been a while! Anything you need this week?", channel: "any" },
  { id: "t5", title: "Special promotion", body: "Hi {name}, we have a special this week — interested in details?", channel: "any" },
];

const SEED_TAGS = [
  { id: "vip", label: "VIP", color: "#B8860B" },
  { id: "pays_late", label: "Pays late", color: "#9C5757" },
  { id: "difficult", label: "Difficult", color: "#8B7355" },
  { id: "discount", label: "Special discount", color: "#5A4A6B" },
  { id: "new_customer", label: "New customer", color: "#2D5A3D" },
];

// ---------- STORAGE ----------
const KEYS = {
  vendors: "crm:vendors", clients: "crm:clients", lang: "crm:lang",
  seeded: "crm:seeded_v3",
  adminCreds: "crm:adminCreds",
  adminPin: "crm:adminPin", // legacy, kept for migration
  leads: "crm:leads",
  dataEntry: "crm:dataEntry",
  templates: "crm:templates",
  tasks: "crm:tasks",
  quotas: "crm:quotas",
  tags: "crm:tags",
  interactions: (date) => `crm:int:${date}`,
};
const DEFAULT_ADMIN_CREDS = { email: "admin@iconproduce.com", password: "admin123" };

function defaultEmailFromName(name) {
  const parts = name.toLowerCase().trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0].replace(/[^a-z0-9]/g, "")}.${parts[1].replace(/[^a-z]/g, "").charAt(0) || "x"}@iconproduce.com`;
  }
  return `${parts[0].replace(/[^a-z0-9]/g, "")}@iconproduce.com`;
}
function defaultPasswordFromName(name) {
  return name.toLowerCase().split(/\s+/)[0].replace(/[^a-z0-9]/g, "") + "123";
}
async function loadKey(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
async function saveKey(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) { console.error("save failed", key, e); }
}

// ---------- SUPABASE DATA MAPPERS ----------
// Database uses snake_case, frontend uses camelCase. These translate between them.

function clientFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    vendorId: row.vendor_id,
    frequency: row.frequency,
    tags: row.tags || [],
    longNote: row.long_note,
    convertedFromLead: row.converted_from_lead,
    convertedAt: row.converted_at ? new Date(row.converted_at).getTime() : null,
    archived: row.archived || false,
    archivedAt: row.archived_at ? new Date(row.archived_at).getTime() : null,
    archiveReason: row.archive_reason || null,
    removalRequested: row.removal_requested || false,
    removalRequestedAt: row.removal_requested_at ? new Date(row.removal_requested_at).getTime() : null,
    removalRequestedBy: row.removal_requested_by || null,
  };
}
function clientToDb(c) {
  const out = {};
  if (c.name !== undefined) out.name = c.name;
  if (c.phone !== undefined) out.phone = c.phone;
  if (c.vendorId !== undefined) out.vendor_id = c.vendorId;
  if (c.frequency !== undefined) out.frequency = c.frequency;
  if (c.tags !== undefined) out.tags = c.tags;
  if (c.longNote !== undefined) out.long_note = c.longNote;
  if (c.convertedFromLead !== undefined) out.converted_from_lead = c.convertedFromLead;
  if (c.archived !== undefined) out.archived = c.archived;
  if (c.archivedAt !== undefined) out.archived_at = c.archivedAt ? new Date(c.archivedAt).toISOString() : null;
  if (c.archiveReason !== undefined) out.archive_reason = c.archiveReason;
  if (c.removalRequested !== undefined) out.removal_requested = c.removalRequested;
  if (c.removalRequestedAt !== undefined) out.removal_requested_at = c.removalRequestedAt ? new Date(c.removalRequestedAt).toISOString() : null;
  if (c.removalRequestedBy !== undefined) out.removal_requested_by = c.removalRequestedBy;
  return out;
}

function leadFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    note: row.note || "",
    status: row.status,
    assignedVendorId: row.assigned_vendor_id,
    createdBy: row.created_by_role
      ? `${row.created_by_role}:${row.created_by}`
      : "manager",
    createdById: row.created_by,
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
    rejectionNote: row.rejection_note,
    approvedAt: row.approved_at ? new Date(row.approved_at).getTime() : null,
    rejectedAt: row.rejected_at ? new Date(row.rejected_at).getTime() : null,
    convertedAt: row.converted_at ? new Date(row.converted_at).getTime() : null,
    history: [],
  };
}
function leadToDb(l) {
  const out = {};
  if (l.name !== undefined) out.name = l.name;
  if (l.phone !== undefined) out.phone = l.phone;
  if (l.note !== undefined) out.note = l.note;
  if (l.status !== undefined) out.status = l.status;
  if (l.assignedVendorId !== undefined) out.assigned_vendor_id = l.assignedVendorId;
  if (l.rejectionNote !== undefined) out.rejection_note = l.rejectionNote;
  return out;
}

function interactionFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    clientId: row.client_id,
    vendorId: row.vendor_id,
    channel: row.channel,
    status: row.status,
    note: row.note || "",
    subReason: row.sub_reason,
    scheduledTime: row.scheduled_time,
    timestamp: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
  };
}
function interactionToDb(i) {
  const out = {};
  if (i.clientId !== undefined) out.client_id = i.clientId;
  if (i.vendorId !== undefined) out.vendor_id = i.vendorId;
  if (i.channel !== undefined) out.channel = i.channel;
  if (i.status !== undefined) out.status = i.status;
  if (i.note !== undefined) out.note = i.note;
  if (i.subReason !== undefined) out.sub_reason = i.subReason;
  if (i.scheduledTime !== undefined) out.scheduled_time = i.scheduledTime;
  return out;
}

function vendorFromProfile(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.full_name,
    phone: row.phone || "",
    email: row.email,
  };
}

function reminderFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    managerId: row.manager_id,
    vendorId: row.vendor_id,
    scheduledFor: row.scheduled_for,
    customMessage: row.custom_message,
    includePendingClients: row.include_pending_clients,
    status: row.status,
    sentAt: row.sent_at ? new Date(row.sent_at).getTime() : null,
    errorMessage: row.error_message,
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
  };
}

// ---------- FASE 3 MAPPERS ----------

function taskFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    description: row.description || "",
    note: row.description || "", // legacy alias for backward compat
    vendorId: row.vendor_id,
    clientId: row.client_id,
    dueDate: row.due_date,
    dueTime: null, // legacy field, not in DB
    priority: row.priority || "normal",
    completed: row.completed || false,
    completedAt: row.completed_at ? new Date(row.completed_at).getTime() : null,
    createdBy: row.created_by,
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
  };
}
function taskToDb(t) {
  const out = {};
  if (t.title !== undefined) out.title = t.title;
  // Accept both description (new) and note (legacy)
  if (t.description !== undefined) out.description = t.description;
  else if (t.note !== undefined) out.description = t.note;
  if (t.vendorId !== undefined) out.vendor_id = t.vendorId;
  if (t.clientId !== undefined) out.client_id = t.clientId;
  if (t.dueDate !== undefined) out.due_date = t.dueDate;
  if (t.priority !== undefined) out.priority = t.priority;
  if (t.completed !== undefined) out.completed = t.completed;
  if (t.completedAt !== undefined) out.completed_at = t.completedAt ? new Date(t.completedAt).toISOString() : null;
  return out;
}

function templateFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    channel: row.channel,
    subject: row.subject || "",
    body: row.body || "",
    createdBy: row.created_by,
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
  };
}
function templateToDb(t) {
  const out = {};
  if (t.name !== undefined) out.name = t.name;
  if (t.channel !== undefined) out.channel = t.channel;
  if (t.subject !== undefined) out.subject = t.subject;
  if (t.body !== undefined) out.body = t.body;
  return out;
}

function tagFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    color: row.color || "#5F2F9D",
    createdBy: row.created_by,
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
  };
}
function tagToDb(tg) {
  const out = {};
  if (tg.name !== undefined) out.name = tg.name;
  if (tg.color !== undefined) out.color = tg.color;
  return out;
}

function quotaFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    vendorId: row.vendor_id,
    periodType: row.period_type || "monthly",
    targetCalls: row.target_calls || 0,
    targetOrders: row.target_orders || 0,
    targetRevenue: Number(row.target_revenue) || 0,
    createdBy: row.created_by,
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
    updatedAt: row.updated_at ? new Date(row.updated_at).getTime() : Date.now(),
  };
}
function quotaToDb(q) {
  const out = {};
  if (q.vendorId !== undefined) out.vendor_id = q.vendorId;
  if (q.periodType !== undefined) out.period_type = q.periodType;
  if (q.targetCalls !== undefined) out.target_calls = q.targetCalls;
  if (q.targetOrders !== undefined) out.target_orders = q.targetOrders;
  if (q.targetRevenue !== undefined) out.target_revenue = q.targetRevenue;
  return out;
}


function dateKeyFor(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function loadInteractionsForDays(daysBack, excludeToday = false) {
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - daysBack);
  startDate.setHours(0, 0, 0, 0);

  let query = supabase
    .from("interactions")
    .select("*")
    .gte("created_at", startDate.toISOString());

  if (excludeToday) {
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    query = query.lt("created_at", todayStart.toISOString());
  }

  const { data, error } = await query.order("created_at", { ascending: false }).limit(5000);
  if (error) {
    console.error("loadInteractionsForDays failed:", error);
    return [];
  }
  return (data || []).map(interactionFromDb);
}

// Load ALL historical interactions for the current user (RLS-filtered).
// Used by Sales Insights to detect ordering patterns over the full history.
// Capped at 20000 rows for performance — beyond that, older data is dropped.
async function loadAllInteractions() {
  const { data, error } = await supabase
    .from("interactions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20000);
  if (error) {
    console.error("loadAllInteractions failed:", error);
    return [];
  }
  return (data || []).map(interactionFromDb);
}

// ============================================
// WEEKLY REPORT PDF GENERATION
// ============================================
//
// generateWeeklyReportPDF computes the past 7 days of activity for the given
// scope (manager = whole team, vendor = own activity) and produces a styled
// PDF that downloads to the user's device.
//
// The PDF includes:
//   1. Header with brand + date range
//   2. Executive summary (totals, comparison vs previous week)
//   3. Day-by-day activity breakdown (table)
//   4. Per-vendor ranking (manager only)
//   5. Top performing clients
//   6. At-risk clients (recurring but missed)
//   7. Outstanding tasks
//   8. Day-of-week patterns

async function generateWeeklyReportPDF({
  scope, // "manager" | "vendor"
  scopeName, // company or vendor name
  vendors,
  clients,
  tasks,
  vendorIdFilter, // null for manager, vendorId for vendor
  t,
}) {
  // Lazy-import jsPDF so we don't load it on every page render
  const { default: jsPDF } = await import("jspdf");

  // ------- Date range: last 7 days ending today -------
  const now = new Date();
  const endDate = new Date(now);
  endDate.setHours(23, 59, 59, 999);
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);
  const prevStart = new Date(startDate);
  prevStart.setDate(prevStart.getDate() - 7);
  const prevEnd = new Date(endDate);
  prevEnd.setDate(prevEnd.getDate() - 7);

  // ------- Load data -------
  // Last 14 days of interactions: current week + previous week for comparison
  const allInts = await loadInteractionsForDays(14, false);

  // Filter by scope
  let scopedClients = (clients || []).filter((c) => !c.archived);
  // Build a set of active client IDs so we filter out interactions for archived/deleted clients.
  // This prevents stale data (from archived clients) from polluting weekly reports.
  const activeClientIdSet = new Set(scopedClients.map((c) => c.id));
  let scopedInts = allInts.filter((i) => activeClientIdSet.has(i.clientId));
  let scopedVendors = vendors || [];
  if (scope === "vendor" && vendorIdFilter) {
    scopedClients = scopedClients.filter((c) => c.vendorId === vendorIdFilter);
    // Re-filter interactions: must be for both this vendor AND a still-active client
    const filteredIdSet = new Set(scopedClients.map((c) => c.id));
    scopedInts = allInts.filter((i) => i.vendorId === vendorIdFilter && filteredIdSet.has(i.clientId));
    scopedVendors = scopedVendors.filter((v) => v.id === vendorIdFilter);
  }

  const currentWeekInts = scopedInts.filter((i) => {
    const ts = i.timestamp || 0;
    return ts >= startDate.getTime() && ts <= endDate.getTime();
  });
  const prevWeekInts = scopedInts.filter((i) => {
    const ts = i.timestamp || 0;
    return ts >= prevStart.getTime() && ts <= prevEnd.getTime();
  });

  // ------- Compute metrics -------
  const callInts = currentWeekInts.filter((i) => (i.channel || "call") === "call");
  const orderedInts = callInts.filter((i) => i.status === "ordered");
  const callbackInts = callInts.filter((i) => i.status === "callback");
  const noAnswerInts = callInts.filter((i) => i.status === "no_answer");
  const notInterestedInts = callInts.filter((i) => i.status === "not_interested");
  const priceIssueInts = callInts.filter((i) => i.status === "price_issue");
  const textInts = currentWeekInts.filter((i) => i.channel === "text");
  const emailInts = currentWeekInts.filter((i) => i.channel === "email");

  const prevCallInts = prevWeekInts.filter((i) => (i.channel || "call") === "call");
  const prevOrderedInts = prevCallInts.filter((i) => i.status === "ordered");

  const uniqueClientsContacted = new Set(callInts.map((i) => i.clientId)).size;
  const uniqueClientsOrdered = new Set(orderedInts.map((i) => i.clientId)).size;
  const conversionRate = callInts.length > 0 ? (orderedInts.length / callInts.length) * 100 : 0;
  const prevConversionRate = prevCallInts.length > 0 ? (prevOrderedInts.length / prevCallInts.length) * 100 : 0;

  // ------- Day-by-day breakdown -------
  const dowLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayBuckets = Array.from({ length: 7 }, (_, idx) => ({
    label: dowLabels[idx],
    calls: 0, orders: 0, callbacks: 0,
  }));
  callInts.forEach((i) => {
    const d = new Date(i.timestamp || 0);
    const dow = d.getDay();
    dayBuckets[dow].calls++;
    if (i.status === "ordered") dayBuckets[dow].orders++;
    else if (i.status === "callback") dayBuckets[dow].callbacks++;
  });

  // ------- Per-vendor breakdown (manager only) -------
  const vendorStats = scopedVendors.map((v) => {
    const vInts = currentWeekInts.filter((i) => i.vendorId === v.id);
    const vCalls = vInts.filter((i) => (i.channel || "call") === "call");
    const vOrders = vCalls.filter((i) => i.status === "ordered");
    const vClients = scopedClients.filter((c) => c.vendorId === v.id);
    return {
      name: v.name,
      calls: vCalls.length,
      orders: vOrders.length,
      conversion: vCalls.length > 0 ? (vOrders.length / vCalls.length) * 100 : 0,
      uniqueOrdered: new Set(vOrders.map((i) => i.clientId)).size,
      totalClients: vClients.length,
    };
  }).sort((a, b) => b.orders - a.orders);

  // ------- Top clients (most orders this week) -------
  const ordersByClient = new Map();
  orderedInts.forEach((i) => {
    ordersByClient.set(i.clientId, (ordersByClient.get(i.clientId) || 0) + 1);
  });
  const topClients = Array.from(ordersByClient.entries())
    .map(([clientId, count]) => {
      const client = scopedClients.find((c) => c.id === clientId);
      return { name: client?.name || "Unknown", phone: client?.phone || "", count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // ------- At-risk clients: ordered last week but NOT this week -------
  const orderedThisWeek = new Set(orderedInts.map((i) => i.clientId));
  const orderedLastWeek = new Set(
    prevWeekInts.filter((i) => i.status === "ordered").map((i) => i.clientId)
  );
  const atRiskClients = [];
  orderedLastWeek.forEach((clientId) => {
    if (!orderedThisWeek.has(clientId)) {
      const client = scopedClients.find((c) => c.id === clientId);
      if (client) atRiskClients.push({ name: client.name, phone: client.phone || "" });
    }
  });

  // ------- Per-client activity (full breakdown for the appendix) -------
  // For every active client in scope, compute weekly stats and timeline.
  // Includes ALL clients (even with no activity) so the manager sees gaps too.
  const clientActivity = scopedClients.map((c) => {
    const clientInts = currentWeekInts
      .filter((i) => i.clientId === c.id)
      .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0)); // oldest first for timeline
    const callsForClient = clientInts.filter((i) => (i.channel || "call") === "call");
    const ordersForClient = callsForClient.filter((i) => i.status === "ordered");
    const callbacksForClient = callsForClient.filter((i) => i.status === "callback");
    const lastInt = clientInts[clientInts.length - 1];
    const vendor = vendors.find((v) => v.id === c.vendorId);
    return {
      client: c,
      vendorName: vendor?.name || "—",
      calls: callsForClient.length,
      orders: ordersForClient.length,
      callbacks: callbacksForClient.length,
      totalInteractions: clientInts.length,
      lastStatus: lastInt?.status || null,
      lastChannel: lastInt?.channel || null,
      conversion: callsForClient.length > 0 ? (ordersForClient.length / callsForClient.length) * 100 : 0,
      timeline: clientInts, // for the detailed expanded section
    };
  }).sort((a, b) => {
    // Sort by orders desc, then by total interactions desc, then by name
    if (b.orders !== a.orders) return b.orders - a.orders;
    if (b.totalInteractions !== a.totalInteractions) return b.totalInteractions - a.totalInteractions;
    return a.client.name.localeCompare(b.client.name);
  });

  // Top 10 most active clients (by interactions, with at least 1 to be eligible) get the expanded detail
  const top10Active = clientActivity
    .filter((ca) => ca.totalInteractions > 0)
    .slice(0, 10);

  // ------- Outstanding tasks (incomplete) -------
  const todayKeyStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })();
  const scopedTasks = (tasks || []).filter((tk) => {
    if (tk.completed) return false;
    if (scope === "vendor" && vendorIdFilter && tk.vendorId !== vendorIdFilter) return false;
    return true;
  });
  const overdueTasks = scopedTasks.filter((tk) => tk.dueDate && tk.dueDate < todayKeyStr);
  const todayTasks = scopedTasks.filter((tk) => tk.dueDate === todayKeyStr);
  const upcomingTasks = scopedTasks.filter((tk) => tk.dueDate && tk.dueDate > todayKeyStr);

  // ============================================
  // BUILD THE PDF
  // ============================================
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 50;
  let y = margin;

  // Brand color in RGB
  const PURPLE = [95, 47, 157];
  const PURPLE_LIGHT = [240, 230, 250];
  const STONE_TEXT = [60, 55, 50];
  const STONE_LIGHT = [140, 130, 120];
  const GREEN = [115, 166, 38];
  const RED = [156, 87, 87];
  const AMBER = [184, 134, 11];

  function addPageIfNeeded(spaceNeeded = 80) {
    if (y + spaceNeeded > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function setColor(rgb) { doc.setTextColor(rgb[0], rgb[1], rgb[2]); }
  function setFill(rgb) { doc.setFillColor(rgb[0], rgb[1], rgb[2]); }

  function fmtDate(d) {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  function fmtPct(n) { return `${n.toFixed(1)}%`; }

  // ------- HEADER -------
  setFill(PURPLE);
  doc.rect(0, 0, pageWidth, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("ICON PRODUCE LLC", margin, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(t.weeklyReport || "Weekly Sales Report", margin, 60);
  doc.setFontSize(9);
  doc.text(`${fmtDate(startDate)} — ${fmtDate(endDate)}`, margin, 76);

  // Scope label on right
  doc.setFontSize(9);
  const scopeLabel = scope === "manager"
    ? (t.fullTeam || "Full team report")
    : `${scopeName} (${t.individual || "Individual"})`;
  const scopeWidth = doc.getTextWidth(scopeLabel);
  doc.text(scopeLabel, pageWidth - margin - scopeWidth, 76);

  y = 120;

  // ------- EXECUTIVE SUMMARY -------
  setColor(STONE_TEXT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(t.executiveSummary || "Executive Summary", margin, y);
  y += 22;

  // Big stat boxes — 4 across
  const statBoxW = (pageWidth - margin * 2 - 24) / 4;
  const statBoxH = 70;
  const statData = [
    { label: t.calls || "Calls", value: callInts.length, color: PURPLE },
    { label: t.orders || "Orders", value: orderedInts.length, color: GREEN, sub: `${fmtPct(conversionRate)}` },
    { label: t.uniqueContacted || "Unique contacted", value: uniqueClientsContacted, color: PURPLE },
    { label: t.uniqueOrdered || "Unique ordered", value: uniqueClientsOrdered, color: GREEN },
  ];
  statData.forEach((s, idx) => {
    const x = margin + idx * (statBoxW + 8);
    setFill([248, 245, 240]);
    doc.roundedRect(x, y, statBoxW, statBoxH, 6, 6, "F");
    setColor(s.color);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(String(s.value), x + 12, y + 28);
    setColor(STONE_LIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(s.label.toUpperCase(), x + 12, y + 46);
    if (s.sub) {
      setColor(GREEN);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(s.sub, x + 12, y + 60);
    }
  });
  y += statBoxH + 16;

  // Comparison line
  const orderDelta = orderedInts.length - prevOrderedInts.length;
  const orderDeltaPct = prevOrderedInts.length > 0
    ? ((orderDelta / prevOrderedInts.length) * 100).toFixed(1)
    : null;
  setColor(STONE_TEXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  let comparisonText = `${t.vsLastWeek || "vs. last week"}: `;
  if (orderDelta > 0) {
    comparisonText += `+${orderDelta} ${t.moreOrders || "more orders"}`;
    if (orderDeltaPct) comparisonText += ` (+${orderDeltaPct}%)`;
  } else if (orderDelta < 0) {
    comparisonText += `${orderDelta} ${t.fewerOrders || "fewer orders"}`;
    if (orderDeltaPct) comparisonText += ` (${orderDeltaPct}%)`;
  } else {
    comparisonText += t.same || "same as last week";
  }
  doc.text(comparisonText, margin, y);
  y += 24;

  // ------- DAY-BY-DAY BREAKDOWN -------
  addPageIfNeeded(180);
  setColor(STONE_TEXT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(t.dayByDayActivity || "Day-by-day activity", margin, y);
  y += 18;

  // Table header
  setFill(PURPLE_LIGHT);
  doc.rect(margin, y, pageWidth - margin * 2, 22, "F");
  setColor(PURPLE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("DAY", margin + 8, y + 14);
  doc.text("CALLS", margin + 120, y + 14);
  doc.text("ORDERS", margin + 200, y + 14);
  doc.text("CALLBACKS", margin + 290, y + 14);
  doc.text("CONVERSION", margin + 400, y + 14);
  y += 22;

  // Table rows — re-order so Mon comes first
  const orderedDayBuckets = [...dayBuckets.slice(1), dayBuckets[0]];
  orderedDayBuckets.forEach((d, idx) => {
    if (idx % 2 === 0) {
      setFill([252, 250, 247]);
      doc.rect(margin, y, pageWidth - margin * 2, 20, "F");
    }
    setColor(STONE_TEXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(d.label, margin + 8, y + 14);
    doc.text(String(d.calls), margin + 120, y + 14);
    setColor(GREEN);
    doc.setFont("helvetica", "bold");
    doc.text(String(d.orders), margin + 200, y + 14);
    setColor(STONE_TEXT);
    doc.setFont("helvetica", "normal");
    doc.text(String(d.callbacks), margin + 290, y + 14);
    const conv = d.calls > 0 ? (d.orders / d.calls) * 100 : 0;
    doc.text(d.calls > 0 ? fmtPct(conv) : "—", margin + 400, y + 14);
    y += 20;
  });
  y += 14;

  // ------- VENDOR RANKING (manager only) -------
  if (scope === "manager" && vendorStats.length > 0) {
    addPageIfNeeded(140);
    setColor(STONE_TEXT);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(t.vendorRanking || "Vendor ranking", margin, y);
    y += 18;

    setFill(PURPLE_LIGHT);
    doc.rect(margin, y, pageWidth - margin * 2, 22, "F");
    setColor(PURPLE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("RANK", margin + 8, y + 14);
    doc.text("NAME", margin + 50, y + 14);
    doc.text("CALLS", margin + 230, y + 14);
    doc.text("ORDERS", margin + 290, y + 14);
    doc.text("CONVERSION", margin + 360, y + 14);
    doc.text("CLIENTS", margin + 460, y + 14);
    y += 22;

    vendorStats.forEach((v, idx) => {
      addPageIfNeeded(24);
      if (idx % 2 === 0) {
        setFill([252, 250, 247]);
        doc.rect(margin, y, pageWidth - margin * 2, 20, "F");
      }
      setColor(STONE_TEXT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`#${idx + 1}`, margin + 8, y + 14);
      doc.text(v.name.substring(0, 30), margin + 50, y + 14);
      doc.text(String(v.calls), margin + 230, y + 14);
      setColor(GREEN);
      doc.setFont("helvetica", "bold");
      doc.text(String(v.orders), margin + 290, y + 14);
      setColor(STONE_TEXT);
      doc.setFont("helvetica", "normal");
      doc.text(v.calls > 0 ? fmtPct(v.conversion) : "—", margin + 360, y + 14);
      doc.text(`${v.uniqueOrdered}/${v.totalClients}`, margin + 460, y + 14);
      y += 20;
    });
    y += 14;
  }

  // ------- TOP CLIENTS -------
  if (topClients.length > 0) {
    addPageIfNeeded(120);
    setColor(STONE_TEXT);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(t.topClients || "Top performing clients", margin, y);
    y += 6;
    setColor(STONE_LIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(t.topClientsHelper || "Most orders placed this week", margin, y + 12);
    y += 24;

    topClients.forEach((c, idx) => {
      addPageIfNeeded(22);
      if (idx % 2 === 0) {
        setFill([252, 250, 247]);
        doc.rect(margin, y, pageWidth - margin * 2, 20, "F");
      }
      setColor(STONE_TEXT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`${idx + 1}.`, margin + 8, y + 14);
      doc.text(c.name.substring(0, 50), margin + 30, y + 14);
      if (c.phone) {
        setColor(STONE_LIGHT);
        doc.setFontSize(9);
        doc.text(c.phone, margin + 280, y + 14);
      }
      setColor(GREEN);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      const ordersText = `${c.count} ${c.count === 1 ? (t.order || "order") : (t.orders || "orders")}`;
      doc.text(ordersText, margin + 420, y + 14);
      y += 20;
    });
    y += 14;
  }

  // ------- AT-RISK CLIENTS -------
  if (atRiskClients.length > 0) {
    addPageIfNeeded(120);
    setColor(STONE_TEXT);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(t.atRiskClients || "At-risk clients", margin, y);
    y += 6;
    setColor(STONE_LIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(t.atRiskHelper || "Ordered last week but not this week — worth reaching out", margin, y + 12);
    y += 24;

    atRiskClients.slice(0, 15).forEach((c, idx) => {
      addPageIfNeeded(22);
      if (idx % 2 === 0) {
        setFill([252, 245, 240]);
        doc.rect(margin, y, pageWidth - margin * 2, 20, "F");
      }
      setColor(RED);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`• ${c.name.substring(0, 50)}`, margin + 8, y + 14);
      if (c.phone) {
        setColor(STONE_LIGHT);
        doc.setFontSize(9);
        doc.text(c.phone, margin + 320, y + 14);
      }
      y += 20;
    });
    y += 14;
  }

  // ------- OUTSTANDING TASKS -------
  if (overdueTasks.length + todayTasks.length + upcomingTasks.length > 0) {
    addPageIfNeeded(140);
    setColor(STONE_TEXT);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(t.outstandingTasks || "Outstanding tasks", margin, y);
    y += 22;

    function renderTaskGroup(heading, taskList, color) {
      if (taskList.length === 0) return;
      addPageIfNeeded(40);
      setColor(color);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(`${heading} (${taskList.length})`, margin, y);
      y += 16;
      taskList.slice(0, 10).forEach((tk) => {
        addPageIfNeeded(20);
        setColor(STONE_TEXT);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const vendor = vendors.find((v) => v.id === tk.vendorId);
        const taskLine = `• ${tk.title.substring(0, 60)}`;
        doc.text(taskLine, margin + 8, y + 12);
        const meta = [tk.dueDate, vendor?.name].filter(Boolean).join(" · ");
        if (meta) {
          setColor(STONE_LIGHT);
          doc.setFontSize(8);
          doc.text(meta.substring(0, 40), margin + 380, y + 12);
        }
        y += 16;
      });
      y += 8;
    }

    renderTaskGroup(t.overdue || "Overdue", overdueTasks, RED);
    renderTaskGroup(t.dueToday || "Due today", todayTasks, AMBER);
    renderTaskGroup(t.upcoming || "Upcoming", upcomingTasks, PURPLE);
    y += 8;
  }

  // ------- INTERACTION BREAKDOWN -------
  addPageIfNeeded(180);
  setColor(STONE_TEXT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(t.interactionBreakdown || "Interaction breakdown", margin, y);
  y += 22;

  const breakdownData = [
    { label: t.statusOrdered || "Ordered", value: orderedInts.length, color: GREEN },
    { label: t.statusCallback || "Callback", value: callbackInts.length, color: [90, 107, 133] },
    { label: t.statusNoAnswer || "No answer", value: noAnswerInts.length, color: [139, 115, 85] },
    { label: t.statusPriceIssue || "Price issue", value: priceIssueInts.length, color: AMBER },
    { label: t.statusNotInterested || "Not interested", value: notInterestedInts.length, color: RED },
    { label: t.textChannel || "Text", value: textInts.length, color: [28, 94, 110] },
    { label: t.emailChannel || "Email", value: emailInts.length, color: [90, 74, 107] },
  ];

  const totalForPct = callInts.length || 1;
  breakdownData.forEach((b) => {
    addPageIfNeeded(24);
    setColor(STONE_TEXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(b.label, margin, y + 12);
    setColor(b.color);
    doc.setFont("helvetica", "bold");
    doc.text(String(b.value), margin + 220, y + 12);
    setColor(STONE_LIGHT);
    doc.setFont("helvetica", "normal");
    const pct = (b.value / totalForPct) * 100;
    doc.text(b.value > 0 ? fmtPct(pct) : "—", margin + 280, y + 12);
    // Bar visualization
    const barW = (b.value / Math.max(...breakdownData.map((x) => x.value), 1)) * 200;
    setFill(b.color);
    doc.rect(margin + 350, y + 4, barW, 12, "F");
    y += 18;
  });
  y += 14;

  // ============================================
  // ------- CLIENT ACTIVITY APPENDIX -------
  // Compact table of ALL active clients (sorted by orders desc) +
  // expanded timeline detail for the top 10 most active clients.
  // ============================================

  // Force a new page for the appendix to keep it visually separated
  doc.addPage();
  y = margin;

  setColor(PURPLE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(t.clientActivityTitle || "Client Activity Appendix", margin, y);
  y += 6;
  setColor(STONE_LIGHT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    t.clientActivitySub || "Per-client breakdown for the week (sorted by orders)",
    margin, y + 12
  );
  y += 28;

  // Translate status to a short label for the table
  function shortStatusLabel(status) {
    if (!status) return "—";
    const labels = {
      ordered: t.shortOrdered || "Order",
      callback: t.shortCallback || "Callback",
      no_answer: t.shortNoAnswer || "No ans.",
      not_interested: t.shortNotInt || "Not int.",
      price_issue: t.shortPriceIssue || "Price",
      other: t.shortOther || "Other",
      sent: t.shortSent || "Sent",
    };
    return labels[status] || status;
  }
  function statusColor(status) {
    const map = {
      ordered: GREEN,
      callback: [90, 107, 133],
      no_answer: [139, 115, 85],
      not_interested: RED,
      price_issue: AMBER,
      sent: [28, 94, 110],
    };
    return map[status] || STONE_LIGHT;
  }

  // ---- COMPACT TABLE: all clients ----
  setColor(STONE_TEXT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(t.allClientsTable || "All clients summary", margin, y);
  y += 14;

  // Table header
  setFill(PURPLE_LIGHT);
  doc.rect(margin, y, pageWidth - margin * 2, 22, "F");
  setColor(PURPLE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("CLIENT", margin + 8, y + 14);
  doc.text("VENDOR", margin + 200, y + 14);
  doc.text("CALLS", margin + 310, y + 14);
  doc.text("ORDERS", margin + 360, y + 14);
  doc.text("CONV.", margin + 415, y + 14);
  doc.text("LAST RESULT", margin + 460, y + 14);
  y += 22;

  clientActivity.forEach((ca, idx) => {
    addPageIfNeeded(22);
    if (idx % 2 === 0) {
      setFill([252, 250, 247]);
      doc.rect(margin, y, pageWidth - margin * 2, 20, "F");
    }
    // Highlight clients with no activity in muted style
    const noActivity = ca.totalInteractions === 0;
    setColor(noActivity ? STONE_LIGHT : STONE_TEXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    // Truncate name to fit
    const nameStr = ca.client.name.length > 30 ? ca.client.name.substring(0, 28) + "…" : ca.client.name;
    doc.text(nameStr, margin + 8, y + 14);
    setColor(STONE_LIGHT);
    const vendorStr = ca.vendorName.length > 18 ? ca.vendorName.substring(0, 16) + "…" : ca.vendorName;
    doc.text(vendorStr, margin + 200, y + 14);
    setColor(STONE_TEXT);
    doc.setFont("helvetica", "normal");
    doc.text(String(ca.calls), margin + 310, y + 14);
    if (ca.orders > 0) {
      setColor(GREEN);
      doc.setFont("helvetica", "bold");
    }
    doc.text(String(ca.orders), margin + 360, y + 14);
    setColor(STONE_TEXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(ca.calls > 0 ? `${ca.conversion.toFixed(0)}%` : "—", margin + 415, y + 14);
    if (ca.lastStatus) {
      setColor(statusColor(ca.lastStatus));
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text(shortStatusLabel(ca.lastStatus), margin + 460, y + 14);
    } else {
      setColor(STONE_LIGHT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(t.noActivity || "No activity", margin + 460, y + 14);
    }
    y += 20;
  });
  y += 18;

  // ---- DETAIL CARDS: top 10 most active ----
  if (top10Active.length > 0) {
    addPageIfNeeded(140);
    setColor(STONE_TEXT);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(t.top10Detail || "Top 10 most active — detailed timeline", margin, y);
    y += 18;

    top10Active.forEach((ca) => {
      // Calculate the height needed (roughly): header 35 + each timeline row ~12 + padding
      const cardHeight = 50 + (ca.timeline.length * 14) + 16;
      addPageIfNeeded(cardHeight);

      // Card background
      setFill([252, 250, 247]);
      doc.roundedRect(margin, y, pageWidth - margin * 2, cardHeight - 6, 6, 6, "F");
      // Left accent stripe
      setFill(PURPLE);
      doc.rect(margin, y, 4, cardHeight - 6, "F");

      // Client name
      setColor(STONE_TEXT);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(ca.client.name, margin + 14, y + 16);

      // Phone + vendor on the right side of header
      setColor(STONE_LIGHT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      const headerRightTxt = `${ca.client.phone || ""} · ${ca.vendorName}`;
      const headerRightW = doc.getTextWidth(headerRightTxt);
      doc.text(headerRightTxt, pageWidth - margin - 14 - headerRightW, y + 16);

      // Stats line
      setColor(STONE_TEXT);
      doc.setFontSize(9);
      const statsTxt = `${ca.calls} ${ca.calls === 1 ? (t.callSingular || "call") : (t.calls || "calls")} · ${ca.orders} ${ca.orders === 1 ? (t.order || "order") : (t.orders || "orders")} · ${ca.conversion.toFixed(0)}% ${t.conversion || "conversion"}`;
      doc.text(statsTxt, margin + 14, y + 32);

      // Timeline header
      setColor(STONE_LIGHT);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.text((t.timeline || "TIMELINE").toUpperCase(), margin + 14, y + 46);

      // Timeline rows
      let timelineY = y + 58;
      ca.timeline.forEach((it) => {
        const itDate = new Date(it.timestamp || 0);
        const dayStr = itDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
        const timeStr = itDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
        const channel = it.channel || "call";
        const status = it.status || "—";

        setColor(STONE_LIGHT);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(`${dayStr} ${timeStr}`, margin + 14, timelineY);

        // Channel
        setColor(STONE_TEXT);
        doc.text(channel, margin + 130, timelineY);

        // Status with color
        setColor(statusColor(status));
        doc.setFont("helvetica", "bold");
        doc.text(shortStatusLabel(status), margin + 180, timelineY);

        // Note (if any) — truncated
        if (it.note) {
          setColor(STONE_TEXT);
          doc.setFont("helvetica", "italic");
          doc.setFontSize(8);
          const noteStr = it.note.length > 60 ? it.note.substring(0, 58) + "…" : it.note;
          doc.text(`"${noteStr}"`, margin + 240, timelineY);
        }
        timelineY += 12;
      });

      y += cardHeight + 4;
    });
  } else {
    setColor(STONE_LIGHT);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text(t.noActiveClientsThisWeek || "No active clients this week", margin, y);
    y += 24;
  }

  // ------- FOOTER on every page -------
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    setColor(STONE_LIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(
      `Icon Produce LLC · ${t.generatedOn || "Generated on"} ${now.toLocaleDateString()} · ${t.page || "Page"} ${i}/${totalPages}`,
      margin,
      pageHeight - 24
    );
  }

  // ------- DOWNLOAD -------
  const fileName = `icon-produce-weekly-${scope}-${now.toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);

  return { fileName, totalPages };
}

async function seedHistoricalIfNeeded(vendors, clients) {
  const seeded = await loadKey(KEYS.seeded, false);
  if (seeded) return null;
  if (!vendors.length || !clients.length) return null;
  // Only seed if user is still on default seed vendors (don't pollute real data)
  const isSeedVendors = vendors.length === SEED_VENDORS.length && vendors.every((v, i) => v.id === SEED_VENDORS[i].id);
  if (!isSeedVendors) { await saveKey(KEYS.seeded, true); return null; }

  // Deterministic loyalty per client (creates ranking variation)
  function loyalty(id) {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = ((h * 31) + id.charCodeAt(i)) | 0;
    return 0.18 + ((Math.abs(h) % 70) / 100); // 0.18 to 0.88
  }
  // Per-vendor performance multiplier (creates "best seller" differentiation)
  function vendorBoost(id) {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = ((h * 17) + id.charCodeAt(i)) | 0;
    return 0.75 + ((Math.abs(h) % 50) / 100); // 0.75 to 1.25
  }
  // Per-vendor conversion skill (some vendors close more leads)
  function conversionSkill(id) {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = ((h * 13) + id.charCodeAt(i)) | 0;
    return 0.4 + ((Math.abs(h) % 50) / 100); // 0.4 to 0.9
  }

  const today = new Date();
  const seedData = [];

  // Generate 1 year of data
  // Note: clients are progressively "active" as they're acquired through lead conversions
  // For seeding, we'll assume all current clients existed throughout the year (simpler)
  // but vary intensity by month to show growth trends

  for (let dayBack = 1; dayBack <= 90; dayBack++) {
    const d = new Date(today);
    d.setDate(today.getDate() - dayBack);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    const dateKey = dateKeyFor(d);
    const dayInts = [];

    // Growth factor: more activity in recent months than older months
    // Older days = less activity (simulates business growth)
    const growthFactor = Math.min(1, 0.5 + (1 - dayBack / 90) * 0.5);

    clients.forEach((client, idx) => {
      const lo = loyalty(client.id) * vendorBoost(client.vendorId) * growthFactor;
      const baseTime = d.getTime() + 8 * 3600 * 1000;
      // Call attempt
      if (Math.random() < 0.78 * growthFactor) {
        let status;
        const r = Math.random();
        if (r < lo * 0.7) status = "ordered";
        else if (r < lo * 0.7 + 0.08) status = "no_answer";
        else if (r < lo * 0.7 + 0.13) status = "callback";
        else if (r < lo * 0.7 + 0.18) status = "price_issue";
        else status = "not_interested";
        dayInts.push({
          id: `s_${dateKey}_${client.id}_c`,
          clientId: client.id, vendorId: client.vendorId,
          channel: "call", status, note: "",
          subReason: status === "not_interested" ? ["has_vendor", "stocked", "closed"][Math.floor(Math.random() * 3)] : null,
          scheduledTime: status === "callback" ? "15:00" : null,
          timestamp: baseTime + idx * 60000,
        });
      }
      if (Math.random() < 0.55 * growthFactor) {
        dayInts.push({
          id: `s_${dateKey}_${client.id}_t`,
          clientId: client.id, vendorId: client.vendorId,
          channel: "text", status: "sent", note: "",
          timestamp: baseTime + idx * 60000 + 30000,
        });
      }
      if (Math.random() < 0.42 * growthFactor) {
        dayInts.push({
          id: `s_${dateKey}_${client.id}_e`,
          clientId: client.id, vendorId: client.vendorId,
          channel: "email", status: "sent", note: "",
          timestamp: baseTime + idx * 60000 + 60000,
        });
      }
    });
    if (dayInts.length > 0) seedData.push({ date: dateKey, ints: dayInts });
  }

  // Only fill empty days — never overwrite existing data
  // Write serially in small batches to avoid storage rate limits
  for (let idx = 0; idx < seedData.length; idx++) {
    const s = seedData[idx];
    const existing = await loadKey(KEYS.interactions(s.date), null);
    if (!existing || existing.length === 0) {
      try {
        await saveKey(KEYS.interactions(s.date), s.ints);
      } catch (e) {
        // If we hit rate limit, just stop seeding more days — app will still work with what we have
        console.warn(`Seed stopped at day ${idx} due to:`, e);
        break;
      }
    }
  }

  // Generate historical leads with conversions (for conversion analytics)
  // Distribute fake leads across the year — some converted, some active, some pending, some rejected
  const fakeLeadNames = [
    "Healthy Foods Co.", "Fresh Start Market", "Green Garden Distrib.", "Premium Produce LLC",
    "Bay Area Wholesale", "City Harvest Inc.", "Mountain View Grocers", "Urban Pantry",
    "Sunset Foods", "Riverside Market", "Oak Tree Distributors", "Liberty Foods",
    "Pacific Wholesale", "Coastal Produce", "Heritage Foods", "Garden State Distrib.",
    "Lakefront Market", "Hillside Grocers", "Maple Leaf Foods", "Cedar Wholesale",
    "Pinetop Distrib.", "Birchwood Foods", "Willow Creek Mkt", "Stonebridge Foods",
  ];

  const seedLeads = [];
  fakeLeadNames.forEach((name, i) => {
    // Spread creation dates across the 90-day window
    const daysAgo = Math.floor((i / fakeLeadNames.length) * 85) + 5;
    const createdAt = today.getTime() - daysAgo * 24 * 3600 * 1000;
    const vendor = vendors[i % vendors.length];
    const skill = conversionSkill(vendor.id);
    const r = Math.random();
    let status, assignedVendorId = null, rejectionNote = null, convertedAt = null, approvedAt = null;

    if (r < skill * 0.55) {
      // Converted
      status = "converted";
      assignedVendorId = vendor.id;
      approvedAt = createdAt + 2 * 24 * 3600 * 1000;
      convertedAt = createdAt + Math.floor(Math.random() * 14 + 3) * 24 * 3600 * 1000;
    } else if (r < skill * 0.55 + 0.15) {
      // Still active (not converted)
      status = "active";
      assignedVendorId = vendor.id;
      approvedAt = createdAt + 1 * 24 * 3600 * 1000;
    } else if (r < skill * 0.55 + 0.25) {
      // Rejected
      status = "rejected";
      rejectionNote = ["Not a good fit", "Out of service area", "Already a competitor's customer"][Math.floor(Math.random() * 3)];
    } else {
      // Pending
      status = "pending";
    }

    const createdBy = i % 3 === 0 ? "manager" : (i % 3 === 1 ? `vendor:${vendor.id}` : "manager");

    seedLeads.push({
      id: `seed_lead_${i}`,
      name,
      phone: `+1 555-0${300 + i}`,
      note: "",
      status,
      assignedVendorId,
      createdBy,
      createdAt,
      approvedAt,
      convertedAt,
      rejectionNote,
      history: [{ action: "created", by: createdBy, at: createdAt }],
    });
  });

  await saveKey(KEYS.leads, seedLeads);
  await saveKey(KEYS.seeded, true);
  return { leads: seedLeads };
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function prettyDate(locale, d = new Date()) {
  return d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
}
function timeStr(ts, locale) {
  return new Date(ts).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
}

// ---------- ROOT ----------
export default function App() {
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const [vendors, setVendors] = useState([]);
  const [clients, setClients] = useState([]);
  const [leads, setLeads] = useState([]);
  const [dataEntryUsers, setDataEntryUsers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [quotas, setQuotas] = useState({});
  const [tags, setTags] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [splashDone, setSplashDone] = useState(false);
  const [adminCreds, setAdminCreds] = useState(DEFAULT_ADMIN_CREDS);
  const [currentUser, setCurrentUser] = useState(null);
  // currentUser shape: null | { role: "vendor", id, name, email } | { role: "admin", email }
  const [adminView, setAdminView] = useState("home"); // "home" | "admin" | "setup"
  const [authView, setAuthView] = useState("login"); // "login" | "signup" | "forgot"
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  // Restore session on page load + listen for auth changes
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (profile) {
          if (profile.status === "pending_approval") {
            setCurrentUser({ role: "pending", id: profile.id, name: profile.full_name, email: profile.email });
          } else if (profile.status === "active") {
            const role = profile.role === "manager" ? "admin" : profile.role;
            setCurrentUser({ role, id: profile.id, name: profile.full_name, email: profile.email });
            if (role === "admin") setAdminView("home");
          }
        }
      }
    })();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setCurrentUser(null);
      }
    });
    return () => subscription?.unsubscribe();
  }, []);

  // Initial app load — only handles things that don't depend on user (lang, local-only data)
  useEffect(() => {
    (async () => {
      try {
        const savedLang = await loadKey(KEYS.lang, "en");
        if (savedLang === "en" || savedLang === "es") setLang(savedLang);

        // Data entry users still in localStorage (legacy)
        const de = await loadKey(KEYS.dataEntry, []);
        setDataEntryUsers(de);
      } catch (e) {
        console.error("Initial load failed:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Load Supabase data when user logs in
  useEffect(() => {
    if (!currentUser || currentUser.role === "pending") {
      setVendors([]); setClients([]); setLeads([]); setInteractions([]);
      return;
    }

    (async () => {
      try {
        // Vendors = active profiles with role='vendor'
        const { data: profiles, error: pErr } = await supabase
          .from("profiles")
          .select("*")
          .eq("status", "active")
          .eq("role", "vendor");
        if (!pErr && profiles) {
          setVendors(profiles.map(vendorFromProfile));
        }

        // Clients (RLS auto-filters: vendors see only theirs)
        const { data: clientsData } = await supabase.from("clients").select("*");
        if (clientsData) setClients(clientsData.map(clientFromDb));

        // Leads (RLS auto-filters)
        const { data: leadsData } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });
        if (leadsData) setLeads(leadsData.map(leadFromDb));

        // Today's interactions (RLS auto-filters)
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const { data: intsData } = await supabase
          .from("interactions")
          .select("*")
          .gte("created_at", startOfToday.toISOString())
          .order("created_at", { ascending: false });
        if (intsData) setInteractions(intsData.map(interactionFromDb));

        // ----- FASE 3: Load tasks, templates, tags, quotas from Supabase -----

        // Tasks (RLS: managers see all, vendors see own)
        const { data: tasksData } = await supabase
          .from("tasks")
          .select("*")
          .order("due_date", { ascending: true, nullsFirst: false });
        if (tasksData) setTasks(tasksData.map(taskFromDb));

        // Templates (org-wide, all active users see them)
        const { data: tplData } = await supabase
          .from("templates")
          .select("*")
          .order("created_at", { ascending: true });
        if (tplData) setTemplates(tplData.map(templateFromDb));

        // Tags (org-wide)
        const { data: tagsData } = await supabase
          .from("tags")
          .select("*")
          .order("created_at", { ascending: true });
        if (tagsData) setTags(tagsData.map(tagFromDb));

        // Quotas (RLS: managers see all, vendors see own)
        const { data: quotasData } = await supabase
          .from("quotas")
          .select("*");
        if (quotasData) {
          // Convert array to object keyed by vendorId for compatibility with existing code
          const qMap = {};
          quotasData.forEach((row) => {
            const q = quotaFromDb(row);
            // Add legacy fields for backward compat with existing UI code
            q.ordersGoal = q.targetOrders;
            q.callsGoal = q.targetCalls;
            qMap[q.vendorId] = q;
          });
          setQuotas(qMap);
        }
      } catch (e) {
        console.error("Failed to load user data:", e);
      }
    })();
  }, [currentUser]);

  // Realtime subscriptions: when data changes anywhere, all clients see updates
  useEffect(() => {
    if (!currentUser || currentUser.role === "pending") return;

    const channel = supabase
      .channel("crm-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "clients" }, async () => {
        const { data } = await supabase.from("clients").select("*");
        if (data) setClients(data.map(clientFromDb));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, async () => {
        const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
        if (data) setLeads(data.map(leadFromDb));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "interactions" }, async () => {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const { data } = await supabase
          .from("interactions")
          .select("*")
          .gte("created_at", startOfToday.toISOString())
          .order("created_at", { ascending: false });
        if (data) setInteractions(data.map(interactionFromDb));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, async () => {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("status", "active")
          .eq("role", "vendor");
        if (data) setVendors(data.map(vendorFromProfile));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "reminders" }, async () => {
        const { data } = await supabase
          .from("reminders")
          .select("*")
          .order("scheduled_for", { ascending: true });
        if (data) setReminders(data.map(reminderFromDb));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, async () => {
        const { data } = await supabase
          .from("tasks")
          .select("*")
          .order("due_date", { ascending: true, nullsFirst: false });
        if (data) setTasks(data.map(taskFromDb));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "templates" }, async () => {
        const { data } = await supabase
          .from("templates")
          .select("*")
          .order("created_at", { ascending: true });
        if (data) setTemplates(data.map(templateFromDb));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "tags" }, async () => {
        const { data } = await supabase
          .from("tags")
          .select("*")
          .order("created_at", { ascending: true });
        if (data) setTags(data.map(tagFromDb));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "quotas" }, async () => {
        const { data } = await supabase.from("quotas").select("*");
        if (data) {
          const qMap = {};
          data.forEach((row) => {
            const q = quotaFromDb(row);
            q.ordersGoal = q.targetOrders;
            q.callsGoal = q.targetCalls;
            qMap[q.vendorId] = q;
          });
          setQuotas(qMap);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [currentUser]);

  async function changeLang(next) { setLang(next); await saveKey(KEYS.lang, next); }
  async function changeAdminCreds(newCreds) {
    setAdminCreds(newCreds);
    await saveKey(KEYS.adminCreds, newCreds);
  }

  async function handleLogin(emailInput, passwordInput) {
    const email = (emailInput || "").trim().toLowerCase();
    const pwd = passwordInput || "";
    setLoginError("");
    if (!email || !pwd) return false;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pwd });
      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          setLoginError("Please confirm your email — check your inbox for the confirmation link");
        } else {
          setLoginError(t.invalidCredentials);
        }
        return false;
      }

      // Fetch the user's profile (role, status)
      const { data: profile, error: profileErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileErr || !profile) {
        setLoginError("Profile not found. Please contact your manager.");
        await supabase.auth.signOut();
        return false;
      }

      if (profile.status === "rejected") {
        setLoginError(`Your account was rejected. ${profile.rejection_note ? `Reason: ${profile.rejection_note}` : "Contact your manager."}`);
        await supabase.auth.signOut();
        return false;
      }

      if (profile.status === "pending_approval") {
        setCurrentUser({ role: "pending", id: profile.id, name: profile.full_name, email: profile.email });
        return true;
      }

      // Active user — set role from profile
      const role = profile.role === "manager" ? "admin" : profile.role;
      setCurrentUser({
        role,
        id: profile.id,
        name: profile.full_name,
        email: profile.email,
      });
      if (role === "admin") setAdminView("home");
      return true;
    } catch (e) {
      console.error("Login failed:", e);
      setLoginError(t.invalidCredentials);
      return false;
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setAdminView("home");
    setAuthView("login");
    setLoginError("");
  }

  async function signUp({ name, phone, email, password }) {
    const cleanEmail = (email || "").trim().toLowerCase();
    if (!name?.trim()) return { success: false, error: t.nameRequired };
    if (!cleanEmail) return { success: false, error: t.emailRequired };
    if (!password || password.length < 6) return { success: false, error: t.passwordTooShort };

    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: name.trim(),
            phone: (phone || "").trim(),
          },
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes("already registered") || error.message.toLowerCase().includes("already exists")) {
          return { success: false, error: t.emailAlreadyTaken };
        }
        return { success: false, error: error.message };
      }

      // Show "check your email" screen
      setAuthView("checkEmail");
      return { success: true, needsEmailConfirmation: true };
    } catch (e) {
      console.error("Signup failed:", e);
      return { success: false, error: e.message || "Sign up failed" };
    }
  }

  async function resetPassword(email, newPassword) {
    const cleanEmail = (email || "").trim().toLowerCase();
    if (!cleanEmail) return { success: false, error: t.emailRequired };

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: window.location.origin,
      });
      if (error) return { success: false, error: error.message };
      return { success: true, emailSent: true };
    } catch (e) {
      return { success: false, error: e.message || "Reset failed" };
    }
  }

  function lookupEmail(searchTerm) {
    // Disabled in Supabase mode — would expose user data publicly. Recommend "forgot password" instead.
    return [];
  }

  // ----- ACCOUNT APPROVAL (Manager only) -----
  const [pendingProfiles, setPendingProfiles] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [myPhone, setMyPhone] = useState("");
  async function loadPendingProfiles() {
    if (currentUser?.role !== "admin") return;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("status", "pending_approval")
      .order("created_at", { ascending: false });
    if (!error && data) setPendingProfiles(data);
  }
  useEffect(() => { loadPendingProfiles(); }, [currentUser]);
  useEffect(() => { loadReminders(); }, [currentUser]);
  useEffect(() => { loadMyPhone(); }, [currentUser]);

  async function approveProfile(profileId) {
    const { error } = await supabase
      .from("profiles")
      .update({
        status: "active",
        approved_by: currentUser.id,
        approved_at: new Date().toISOString(),
      })
      .eq("id", profileId);
    if (!error) await loadPendingProfiles();
  }

  async function rejectProfile(profileId, note) {
    const { error } = await supabase
      .from("profiles")
      .update({
        status: "rejected",
        rejection_note: note || null,
      })
      .eq("id", profileId);
    if (!error) await loadPendingProfiles();
  }

  // ----- REMINDERS (SMS scheduling) -----
  async function loadReminders() {
    if (!currentUser) return;
    const { data, error } = await supabase
      .from("reminders")
      .select("*")
      .order("scheduled_for", { ascending: true });
    if (!error && data) {
      setReminders(data.map(reminderFromDb));
    }
  }

  async function createReminder({ vendorId, scheduledFor, customMessage, includePendingClients }) {
    if (!vendorId || !scheduledFor) return { success: false, error: "Missing required fields" };

    const { data, error } = await supabase
      .from("reminders")
      .insert({
        manager_id: currentUser.id,
        vendor_id: vendorId,
        scheduled_for: scheduledFor,
        custom_message: customMessage || null,
        include_pending_clients: includePendingClients !== false,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("createReminder failed:", error);
      return { success: false, error: error.message };
    }
    if (data) {
      setReminders((prev) => [...prev, reminderFromDb(data)].sort((a, b) => new Date(a.scheduledFor) - new Date(b.scheduledFor)));
    }
    return { success: true, reminder: data ? reminderFromDb(data) : null };
  }

  async function cancelReminder(reminderId) {
    const { error } = await supabase
      .from("reminders")
      .update({ status: "cancelled" })
      .eq("id", reminderId);
    if (!error) {
      setReminders((prev) => prev.map((r) => r.id === reminderId ? { ...r, status: "cancelled" } : r));
    }
  }

  async function deleteReminder(reminderId) {
    const { error } = await supabase
      .from("reminders")
      .delete()
      .eq("id", reminderId);
    if (!error) {
      setReminders((prev) => prev.filter((r) => r.id !== reminderId));
    }
  }

  async function markReminderSent(reminderId) {
    const { error } = await supabase
      .from("reminders")
      .update({ status: "sent", sent_at: new Date().toISOString() })
      .eq("id", reminderId);
    if (!error) {
      setReminders((prev) => prev.map((r) => r.id === reminderId ? { ...r, status: "sent", sentAt: Date.now() } : r));
    }
  }

  // ----- USER PROFILE PHONE -----
  async function updateMyPhone(newPhone) {
    if (!currentUser) return;
    const { error } = await supabase
      .from("profiles")
      .update({ phone: newPhone })
      .eq("id", currentUser.id);
    if (!error) {
      setMyPhone(newPhone);
    }
    return !error;
  }

  async function loadMyPhone() {
    if (!currentUser) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("phone")
      .eq("id", currentUser.id)
      .single();
    if (!error && data) {
      setMyPhone(data.phone || "");
    }
  }


  async function logInteraction(payload) {
    const dbPayload = interactionToDb(payload);
    if (!dbPayload.vendor_id) dbPayload.vendor_id = currentUser?.id;
    if (!dbPayload.channel) dbPayload.channel = "call";

    const { data, error } = await supabase
      .from("interactions")
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      console.error("logInteraction failed:", error);
      return;
    }
    if (data) {
      setInteractions((prev) => [interactionFromDb(data), ...prev]);
    }

    // Auto-convert lead → customer on first "ordered" call
    if (payload.status === "ordered" && payload.channel !== "text" && payload.channel !== "email") {
      const lead = leads.find((l) => l.id === payload.clientId && l.status === "active");
      if (lead) {
        await convertLeadToCustomer(lead);
      }
    }

    // AUTO-ARCHIVE: After 3rd "not interested" total, archive the client
    if (payload.status === "not_interested" && payload.channel === "call" && payload.clientId) {
      try {
        // Count total "not_interested" call interactions for this client (across all time)
        const { count, error: countError } = await supabase
          .from("interactions")
          .select("id", { count: "exact", head: true })
          .eq("client_id", payload.clientId)
          .eq("channel", "call")
          .eq("status", "not_interested");

        if (countError) {
          console.error("Failed to count not_interested:", countError);
          return;
        }

        if (count >= 3) {
          // Archive the client
          const client = clients.find((c) => c.id === payload.clientId);
          if (client && !client.archived) {
            const { error: archiveError } = await supabase
              .from("clients")
              .update({
                archived: true,
                archived_at: new Date().toISOString(),
                archive_reason: "auto: 3 not interested",
              })
              .eq("id", payload.clientId);
            if (archiveError) {
              console.error("Failed to archive client:", archiveError);
            } else {
              // Optimistic update
              setClients((prev) => prev.map((c) =>
                c.id === payload.clientId
                  ? { ...c, archived: true, archivedAt: Date.now(), archiveReason: "auto: 3 not interested" }
                  : c
              ));
            }
          }
        }
      } catch (e) {
        console.error("Auto-archive check failed:", e);
      }
    }
  }

  // Helper for manager to manually archive/unarchive a client
  async function setClientArchived(clientId, archived, reason = null) {
    const updates = {
      archived,
      archived_at: archived ? new Date().toISOString() : null,
      archive_reason: archived ? (reason || "manual") : null,
    };
    const { error } = await supabase.from("clients").update(updates).eq("id", clientId);
    if (error) {
      console.error("Failed to set archived:", error);
      return;
    }
    setClients((prev) => prev.map((c) =>
      c.id === clientId
        ? { ...c, archived, archivedAt: archived ? Date.now() : null, archiveReason: archived ? (reason || "manual") : null }
        : c
    ));
  }

  // Vendor requests removal of a client
  async function requestClientRemoval(clientId) {
    if (!currentUser) return;
    const { error } = await supabase
      .from("clients")
      .update({
        removal_requested: true,
        removal_requested_at: new Date().toISOString(),
        removal_requested_by: currentUser.id,
      })
      .eq("id", clientId);
    if (error) {
      console.error("Failed to request removal:", error);
      return;
    }
    setClients((prev) => prev.map((c) =>
      c.id === clientId
        ? { ...c, removalRequested: true, removalRequestedAt: Date.now(), removalRequestedBy: currentUser.id }
        : c
    ));
  }

  // Vendor cancels their own removal request
  async function cancelClientRemovalRequest(clientId) {
    const { error } = await supabase
      .from("clients")
      .update({
        removal_requested: false,
        removal_requested_at: null,
        removal_requested_by: null,
      })
      .eq("id", clientId);
    if (error) {
      console.error("Failed to cancel removal request:", error);
      return;
    }
    setClients((prev) => prev.map((c) =>
      c.id === clientId
        ? { ...c, removalRequested: false, removalRequestedAt: null, removalRequestedBy: null }
        : c
    ));
  }

  // Manager approves a removal request (archives the client)
  async function approveRemovalRequest(clientId) {
    const { error } = await supabase
      .from("clients")
      .update({
        archived: true,
        archived_at: new Date().toISOString(),
        archive_reason: "vendor request",
        removal_requested: false,
        removal_requested_at: null,
        removal_requested_by: null,
      })
      .eq("id", clientId);
    if (error) {
      console.error("Failed to approve removal:", error);
      return;
    }
    setClients((prev) => prev.map((c) =>
      c.id === clientId
        ? { ...c, archived: true, archivedAt: Date.now(), archiveReason: "vendor request",
            removalRequested: false, removalRequestedAt: null, removalRequestedBy: null }
        : c
    ));
  }

  // Manager rejects a removal request (clears the request flag, client stays active)
  async function rejectRemovalRequest(clientId) {
    const { error } = await supabase
      .from("clients")
      .update({
        removal_requested: false,
        removal_requested_at: null,
        removal_requested_by: null,
      })
      .eq("id", clientId);
    if (error) {
      console.error("Failed to reject removal:", error);
      return;
    }
    setClients((prev) => prev.map((c) =>
      c.id === clientId
        ? { ...c, removalRequested: false, removalRequestedAt: null, removalRequestedBy: null }
        : c
    ));
  }

  async function convertLeadToCustomer(lead) {
    // Insert client (using lead's id so existing interactions continue to match)
    const { error: cErr } = await supabase.from("clients").insert({
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      vendor_id: lead.assignedVendorId,
      frequency: "weekly",
      converted_from_lead: true,
      converted_at: new Date().toISOString(),
    });
    if (cErr) {
      console.error("Failed to create client from lead:", cErr);
      return;
    }

    // Mark lead as converted
    const { error: lErr } = await supabase
      .from("leads")
      .update({
        status: "converted",
        converted_at: new Date().toISOString(),
      })
      .eq("id", lead.id);
    if (lErr) console.error("Failed to mark lead as converted:", lErr);
  }

  async function deleteInteraction(id) {
    const { error } = await supabase.from("interactions").delete().eq("id", id);
    if (error) {
      console.error("deleteInteraction failed:", error);
      return;
    }
    setInteractions((prev) => prev.filter((i) => i.id !== id));
  }

  async function updateInteraction(id, updates) {
    const dbUpdates = interactionToDb(updates);
    const { error } = await supabase.from("interactions").update(dbUpdates).eq("id", id);
    if (error) {
      console.error("updateInteraction failed:", error);
      return;
    }
    setInteractions((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  }

  // Close a pending callback by logging a NEW interaction with the actual outcome.
  // The original callback stays in history (full audit trail).
  async function closeCallback({ originalCallbackId, newStatus, note }) {
    const callbackInt = interactions.find((i) => i.id === originalCallbackId);
    if (!callbackInt) {
      console.error("Original callback not found");
      return;
    }
    // Log the new interaction with the actual outcome
    await logInteraction({
      clientId: callbackInt.clientId,
      vendorId: currentUser?.id || callbackInt.vendorId,
      channel: "call",
      status: newStatus,
      note: note || null,
    });
  }

  // updateVendors — vendors are now profiles, this just updates local state for legacy code paths
  async function updateVendors(next) { setVendors(next); }
  async function updateDataEntryUsers(next) { setDataEntryUsers(next); await saveKey(KEYS.dataEntry, next); }

  // updateClients — receives full new array (legacy interface). Diffs and applies to Supabase.
  async function updateClients(nextClients) {
    const prevById = new Map(clients.map((c) => [c.id, c]));
    const nextById = new Map(nextClients.map((c) => [c.id, c]));

    // Removed
    for (const c of clients) {
      if (!nextById.has(c.id)) {
        const { error } = await supabase.from("clients").delete().eq("id", c.id);
        if (error) console.error("Failed to delete client:", error);
      }
    }
    // Added
    for (const c of nextClients) {
      if (!prevById.has(c.id)) {
        const dbRow = clientToDb(c);
        // If the local id looks generated (starts with "c_" or non-uuid), let DB generate one
        const looksLikeUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(c.id || "");
        if (looksLikeUuid) dbRow.id = c.id;
        const { error } = await supabase.from("clients").insert(dbRow);
        if (error) console.error("Failed to insert client:", error);
      }
    }
    // Updated
    for (const c of nextClients) {
      const prev = prevById.get(c.id);
      if (!prev) continue;
      if (JSON.stringify(prev) !== JSON.stringify(c)) {
        const dbUpdates = clientToDb(c);
        const { error } = await supabase.from("clients").update(dbUpdates).eq("id", c.id);
        if (error) console.error("Failed to update client:", error);
      }
    }
    setClients(nextClients);
  }

  // ----- LEAD MANAGEMENT -----
  async function createLead({ name, phone, note, createdBy, status = "pending" }) {
    if (!name?.trim()) return { success: false, error: t.nameRequired };

    let createdByRole = "manager";
    let createdById = currentUser?.id;
    if (createdBy && createdBy.includes(":")) {
      const [role, id] = createdBy.split(":");
      createdByRole = role;
      createdById = id;
    }

    const newLead = {
      name: name.trim(),
      phone: (phone || "").trim(),
      note: (note || "").trim(),
      status,
      created_by: createdById,
      created_by_role: createdByRole,
    };

    const { data, error } = await supabase
      .from("leads")
      .insert(newLead)
      .select()
      .single();

    if (error) {
      console.error("createLead failed:", error);
      return { success: false, error: error.message };
    }
    if (data) {
      setLeads((prev) => [leadFromDb(data), ...prev]);
    }
    return { success: true, lead: data ? leadFromDb(data) : null };
  }

  async function approveLead(leadId, vendorId, approverLabel = "manager") {
    const { error } = await supabase
      .from("leads")
      .update({
        status: "active",
        assigned_vendor_id: vendorId,
        approved_at: new Date().toISOString(),
      })
      .eq("id", leadId);

    if (error) {
      console.error("approveLead failed:", error);
      return;
    }
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, status: "active", assignedVendorId: vendorId, approvedAt: Date.now() }
          : l
      )
    );
  }

  async function rejectLead(leadId, reason, rejecterLabel = "manager") {
    const { error } = await supabase
      .from("leads")
      .update({
        status: "rejected",
        rejection_note: reason,
        rejected_at: new Date().toISOString(),
      })
      .eq("id", leadId);

    if (error) {
      console.error("rejectLead failed:", error);
      return;
    }
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, status: "rejected", rejectionNote: reason, rejectedAt: Date.now() }
          : l
      )
    );
  }

  async function updateLead(leadId, updates) {
    const dbUpdates = leadToDb(updates);
    const { error } = await supabase.from("leads").update(dbUpdates).eq("id", leadId);
    if (error) {
      console.error("updateLead failed:", error);
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, ...updates } : l)));
  }

  async function deleteLead(leadId) {
    const { error } = await supabase.from("leads").delete().eq("id", leadId);
    if (error) {
      console.error("deleteLead failed:", error);
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
  }

  // ----- TEMPLATES -----
  // Legacy interface: receives full new array, diffs and applies to Supabase
  async function updateTemplates(nextTemplates) {
    const prevById = new Map(templates.map((tp) => [tp.id, tp]));
    const nextById = new Map(nextTemplates.map((tp) => [tp.id, tp]));

    // Removed
    for (const tp of templates) {
      if (!nextById.has(tp.id)) {
        const { error } = await supabase.from("templates").delete().eq("id", tp.id);
        if (error) console.error("Failed to delete template:", error);
      }
    }
    // Added
    for (const tp of nextTemplates) {
      if (!prevById.has(tp.id)) {
        const dbRow = templateToDb(tp);
        const looksLikeUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(tp.id || "");
        if (looksLikeUuid) dbRow.id = tp.id;
        const { error } = await supabase.from("templates").insert(dbRow);
        if (error) console.error("Failed to insert template:", error);
      }
    }
    // Updated
    for (const tp of nextTemplates) {
      const prev = prevById.get(tp.id);
      if (!prev) continue;
      if (JSON.stringify(prev) !== JSON.stringify(tp)) {
        const dbUpdates = templateToDb(tp);
        const { error } = await supabase.from("templates").update(dbUpdates).eq("id", tp.id);
        if (error) console.error("Failed to update template:", error);
      }
    }
    setTemplates(nextTemplates);
  }

  // ----- TASKS -----
  async function createTask({ title, dueDate, dueTime, clientId, note, vendorId }) {
    const newTask = {
      title: (title || "").trim(),
      due_date: dueDate || null,
      client_id: clientId || null,
      vendor_id: vendorId || null,
      description: (note || "").trim() || null,
      priority: "normal",
      completed: false,
      created_by: currentUser?.id || null,
    };
    const { data, error } = await supabase
      .from("tasks")
      .insert(newTask)
      .select()
      .single();
    if (error) {
      console.error("createTask failed:", error);
      return null;
    }
    if (data) {
      const mapped = taskFromDb(data);
      setTasks((prev) => [...prev, mapped]);
      return mapped;
    }
    return null;
  }
  async function updateTask(id, updates) {
    const dbUpdates = taskToDb(updates);
    const { error } = await supabase.from("tasks").update(dbUpdates).eq("id", id);
    if (error) {
      console.error("updateTask failed:", error);
      return;
    }
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }
  async function deleteTask(id) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("deleteTask failed:", error);
      return;
    }
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // ----- QUOTAS -----
  // Legacy interface: setQuotaForVendor with orders+calls goal numbers
  // Internally maps to the quotas table (one row per vendor)
  async function setQuotaForVendor(vendorId, ordersGoal, callsGoal) {
    const ordersInt = Number(ordersGoal) || 0;
    const callsInt = Number(callsGoal) || 0;

    // Check if quota row exists for this vendor
    const existing = quotas[vendorId];
    if (existing && existing.id) {
      // Update existing
      const { error } = await supabase
        .from("quotas")
        .update({
          target_orders: ordersInt,
          target_calls: callsInt,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
      if (error) {
        console.error("Failed to update quota:", error);
        return;
      }
      setQuotas((prev) => ({
        ...prev,
        [vendorId]: { ...prev[vendorId], targetOrders: ordersInt, targetCalls: callsInt, ordersGoal: ordersInt, callsGoal: callsInt },
      }));
    } else {
      // Create new
      const { data, error } = await supabase
        .from("quotas")
        .insert({
          vendor_id: vendorId,
          period_type: "monthly",
          target_orders: ordersInt,
          target_calls: callsInt,
          target_revenue: 0,
          created_by: currentUser?.id || null,
        })
        .select()
        .single();
      if (error) {
        console.error("Failed to create quota:", error);
        return;
      }
      if (data) {
        const mapped = quotaFromDb(data);
        // Add legacy fields for backward compat with existing UI code
        mapped.ordersGoal = ordersInt;
        mapped.callsGoal = callsInt;
        setQuotas((prev) => ({ ...prev, [vendorId]: mapped }));
      }
    }
  }

  // ----- TAGS -----
  // Legacy interface: receives full new array, diffs and applies to Supabase
  async function updateTags(nextTags) {
    const prevById = new Map(tags.map((tg) => [tg.id, tg]));
    const nextById = new Map(nextTags.map((tg) => [tg.id, tg]));

    // Removed
    for (const tg of tags) {
      if (!nextById.has(tg.id)) {
        const { error } = await supabase.from("tags").delete().eq("id", tg.id);
        if (error) console.error("Failed to delete tag:", error);
      }
    }
    // Added
    for (const tg of nextTags) {
      if (!prevById.has(tg.id)) {
        const dbRow = tagToDb(tg);
        const looksLikeUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(tg.id || "");
        if (looksLikeUuid) dbRow.id = tg.id;
        const { error } = await supabase.from("tags").insert(dbRow);
        if (error) console.error("Failed to insert tag:", error);
      }
    }
    // Updated
    for (const tg of nextTags) {
      const prev = prevById.get(tg.id);
      if (!prev) continue;
      if (JSON.stringify(prev) !== JSON.stringify(tg)) {
        const dbUpdates = tagToDb(tg);
        const { error } = await supabase.from("tags").update(dbUpdates).eq("id", tg.id);
        if (error) console.error("Failed to update tag:", error);
      }
    }
    setTags(nextTags);
  }

  if (loading || !splashDone) {
    return <Splash />;
  }

  return (
    <div className="min-h-screen relative" style={{ background: "#F5F1EA", fontFamily: "'Montserrat', -apple-system, sans-serif", color: "#1C1B1A" }}>
      <FontImport />
      <TopBar t={t} lang={lang} onChangeLang={changeLang} currentUser={currentUser} onLogout={handleLogout} />

      {!currentUser && authView === "login" && (
        <Login
          t={t}
          onLogin={handleLogin}
          loginError={loginError}
          clearError={() => setLoginError("")}
          vendors={vendors}
          adminCreds={adminCreds}
          onGoSignup={() => { setLoginError(""); setAuthView("signup"); }}
          onGoForgot={() => { setLoginError(""); setAuthView("forgot"); }}
        />
      )}

      {!currentUser && authView === "signup" && (
        <SignUp
          t={t}
          onSignUp={signUp}
          onBackToLogin={() => setAuthView("login")}
        />
      )}

      {!currentUser && authView === "forgot" && (
        <Forgot
          t={t}
          onResetPassword={resetPassword}
          onLookupEmail={lookupEmail}
          onBackToLogin={() => setAuthView("login")}
        />
      )}

      {!currentUser && authView === "checkEmail" && (
        <CheckEmailScreen t={t} onBackToLogin={() => setAuthView("login")} />
      )}

      {currentUser?.role === "pending" && (
        <PendingApprovalScreen t={t} userName={currentUser.name} onLogout={handleLogout} />
      )}

      {currentUser?.role === "vendor" && (
        <VendorView
          t={t}
          vendorId={currentUser.id}
          vendors={vendors}
          clients={clients}
          leads={leads}
          interactions={interactions}
          templates={templates}
          tasks={tasks}
          quotas={quotas}
          tags={tags}
          myPhone={myPhone}
          onUpdatePhone={updateMyPhone}
          onLog={logInteraction}
          onUndo={deleteInteraction}
          onUpdate={updateInteraction}
          onCloseCallback={closeCallback}
          onRequestLead={(payload) => createLead({ ...payload, createdBy: `vendor:${currentUser.id}`, status: "pending" })}
          onCreateTask={createTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onUpdateClient={(id, updates) => updateClients(clients.map((c) => c.id === id ? { ...c, ...updates } : c))}
          onRequestRemoval={requestClientRemoval}
          onCancelRemovalRequest={cancelClientRemovalRequest}
          onBack={handleLogout}
        />
      )}

      {currentUser?.role === "data_entry" && (
        <DataEntryView
          t={t}
          currentUser={currentUser}
          vendors={vendors}
          leads={leads}
          onCreate={(payload) => createLead({ ...payload, createdBy: `data_entry:${currentUser.id}`, status: "pending" })}
          onUpdateLead={updateLead}
        />
      )}

      {currentUser?.role === "admin" && adminView === "home" && (
        <AdminHome
          t={t}
          currentUser={currentUser}
          leads={leads}
          tasks={tasks}
          pendingProfiles={pendingProfiles}
          reminders={reminders}
          clients={clients}
          vendors={vendors}
          onCreateTask={createTask}
          onCreateClient={(c) => updateClients([...clients, c])}
          onCreateLead={(payload) => createLead({
            ...payload,
            createdBy: `manager:${currentUser.id}`,
            status: "pending",
          })}
          onPick={setAdminView}
        />
      )}
      {currentUser?.role === "admin" && adminView === "approvals" && (
        <ApprovalsView
          t={t}
          pendingProfiles={pendingProfiles}
          onApprove={approveProfile}
          onReject={rejectProfile}
          onBack={() => setAdminView("home")}
        />
      )}
      {currentUser?.role === "admin" && adminView === "admin" && (
        <AdminView t={t} vendors={vendors} clients={clients} leads={leads} interactions={interactions} quotas={quotas} onBack={() => setAdminView("home")} />
      )}
      {currentUser?.role === "admin" && adminView === "leads" && (
        <LeadsView
          t={t}
          vendors={vendors}
          dataEntryUsers={dataEntryUsers}
          leads={leads}
          currentUser={currentUser}
          onCreate={(payload) => createLead({ ...payload, createdBy: `manager:${currentUser.id}`, status: "pending" })}
          onApprove={approveLead}
          onReject={rejectLead}
          onUpdate={updateLead}
          onDelete={deleteLead}
          onBack={() => setAdminView("home")}
        />
      )}
      {currentUser?.role === "admin" && adminView === "tasks" && (
        <TasksAdminView
          t={t}
          tasks={tasks}
          vendors={vendors}
          clients={clients}
          onCreateTask={createTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onBack={() => setAdminView("home")}
        />
      )}
      {currentUser?.role === "admin" && adminView === "reminders" && (
        <RemindersView
          t={t}
          reminders={reminders}
          vendors={vendors}
          clients={clients}
          interactions={interactions}
          onCreate={createReminder}
          onCancel={cancelReminder}
          onDelete={deleteReminder}
          onMarkSent={markReminderSent}
          onBack={() => setAdminView("home")}
        />
      )}
      {currentUser?.role === "admin" && adminView === "archived" && (
        <ArchivedClientsView
          t={t}
          clients={clients}
          vendors={vendors}
          interactions={interactions}
          onUnarchive={(clientId) => setClientArchived(clientId, false)}
          onBack={() => setAdminView("home")}
        />
      )}
      {currentUser?.role === "admin" && adminView === "removal-requests" && (
        <RemovalRequestsView
          t={t}
          clients={clients}
          vendors={vendors}
          interactions={interactions}
          onApprove={approveRemovalRequest}
          onReject={rejectRemovalRequest}
          onBack={() => setAdminView("home")}
        />
      )}
      {currentUser?.role === "admin" && adminView === "insights" && (
        <ManagerInsightsView
          t={t}
          vendors={vendors}
          clients={clients}
          interactions={interactions}
          onBack={() => setAdminView("home")}
        />
      )}
      {currentUser?.role === "admin" && adminView === "setup" && (
        <SetupView
          t={t}
          vendors={vendors}
          clients={clients}
          dataEntryUsers={dataEntryUsers}
          templates={templates}
          tags={tags}
          quotas={quotas}
          interactions={interactions}
          updateVendors={updateVendors}
          updateClients={updateClients}
          updateDataEntryUsers={updateDataEntryUsers}
          updateTemplates={updateTemplates}
          updateTags={updateTags}
          setQuotaForVendor={setQuotaForVendor}
          adminCreds={adminCreds}
          changeAdminCreds={changeAdminCreds}
          onBack={() => setAdminView("home")}
        />
      )}
    </div>
  );
}

// ---------- FONT ----------
function FontImport() {
  return (
    <style>{`
      @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Shadows+Into+Light&display=swap');
      .display { font-family: 'Cabinet Grotesk', 'Manrope', system-ui, sans-serif; font-weight: 700; letter-spacing: -0.02em; }
      .script { font-family: 'Shadows Into Light', cursive; font-weight: 400; }
      button:active { transform: scale(0.98); }
      .card-shadow { box-shadow: 0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -16px rgba(28,27,26,0.12); }
      input, select { font-family: inherit; }
    `}</style>
  );
}

function Splash() {
  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: "#F5F1EA", fontFamily: "'Montserrat', -apple-system, sans-serif" }}
    >
      <FontImport />
      <div className="flex flex-col items-center splash-logo-anim">
        <div
          className="display"
          style={{
            color: BRAND_PURPLE,
            fontSize: "clamp(3rem, 12vw, 5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Icon Produce
        </div>
        <div
          className="display splash-crm-anim mt-3"
          style={{
            color: BRAND_PURPLE,
            fontSize: "clamp(1rem, 3vw, 1.25rem)",
            letterSpacing: "0.45em",
            paddingLeft: "0.45em",
            fontWeight: 800,
            opacity: 0.9,
          }}
        >
          CRM
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 text-center splash-foot-anim">
        <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: BRAND_PURPLE, opacity: 0.4 }}>
          Sales Management
        </div>
      </div>
      <style>{`
        .splash-logo-anim { animation: splashIn 700ms cubic-bezier(0.2, 0.8, 0.2, 1); }
        .splash-crm-anim { animation: splashCrm 900ms cubic-bezier(0.2, 0.8, 0.2, 1) 250ms backwards; }
        .splash-foot-anim { animation: splashFoot 700ms ease-out 600ms backwards; }
        @keyframes splashIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes splashCrm {
          0% { opacity: 0; transform: translateY(6px); letter-spacing: 0.15em; }
          100% { opacity: 0.9; transform: translateY(0); letter-spacing: 0.45em; }
        }
        @keyframes splashFoot {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 0.4; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function TopBar({ t, lang, onChangeLang, currentUser, onLogout }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <div className="flex bg-white rounded-full p-0.5 card-shadow text-xs font-medium" style={{ border: "1px solid rgba(28,27,26,0.06)" }}>
        <button onClick={() => onChangeLang("en")} className="px-2.5 py-1 rounded-full transition-all" style={{ background: lang === "en" ? "#5F2F9D" : "transparent", color: lang === "en" ? "#F5F1EA" : "#8B7355" }}>EN</button>
        <button onClick={() => onChangeLang("es")} className="px-2.5 py-1 rounded-full transition-all" style={{ background: lang === "es" ? "#5F2F9D" : "transparent", color: lang === "es" ? "#F5F1EA" : "#8B7355" }}>ES</button>
      </div>
      {currentUser && (
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 card-shadow text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors"
          style={{ border: "1px solid rgba(28,27,26,0.06)" }}
        >
          <LogOut size={11} />
          <span className="hidden sm:inline">{t.logout}</span>
        </button>
      )}
    </div>
  );
}

// ---------- CHECK EMAIL SCREEN (after signup) ----------
function CheckEmailScreen({ t, onBackToLogin }) {
  return (
    <div className="min-h-screen flex flex-col items-center px-5 pt-20 pb-12" style={{ background: "#F5F1EA" }}>
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-3xl p-7 card-shadow text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: BRAND_PURPLE + "15" }}>
            <Mail size={26} style={{ color: BRAND_PURPLE }} />
          </div>
          <h1 className="display text-2xl mb-2">Check your email</h1>
          <p className="text-sm text-stone-600 mb-6 leading-relaxed">
            We sent you a confirmation link. Click it to verify your account, then come back to sign in.
          </p>
          <div className="text-xs text-stone-500 mb-5 italic">
            After confirming, your account will be reviewed by the manager before you can access the app.
          </div>
          <button
            onClick={onBackToLogin}
            className="w-full py-3 rounded-lg text-sm font-semibold text-white"
            style={{ background: BRAND_PURPLE }}
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- PENDING APPROVAL SCREEN ----------
function PendingApprovalScreen({ t, userName, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col items-center px-5 pt-20 pb-12" style={{ background: "#F5F1EA" }}>
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-3xl p-7 card-shadow text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#FFF5D6" }}>
            <Clock size={26} style={{ color: "#8B6F1A" }} />
          </div>
          <h1 className="display text-2xl mb-1">Hi {userName}</h1>
          <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#8B6F1A" }}>
            Pending approval
          </div>
          <p className="text-sm text-stone-600 mb-6 leading-relaxed">
            Your account was created successfully. The manager will review and approve it soon. You'll be able to sign in once it's approved.
          </p>
          <button
            onClick={onLogout}
            className="w-full py-2.5 rounded-lg bg-stone-100 text-sm font-medium text-stone-700"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- LOGIN ----------
function Login({ t, onLogin, loginError, clearError, vendors, adminCreds, onGoSignup, onGoForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e) {
    if (e) e.preventDefault();
    if (!email.trim() || !password) return;
    setSubmitting(true);
    await onLogin(email, password);
    setSubmitting(false);
  }

  function fillCreds(em, pw) {
    setEmail(em);
    setPassword(pw);
    clearError();
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-5 pt-20 pb-12" style={{ background: "#F5F1EA" }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-7">
          <img src={LOGO_DATA_URL} alt="Icon Produce LLC" className="w-44 h-auto" draggable={false} />
        </div>

        <div className="bg-white rounded-3xl p-6 card-shadow">
          <h1 className="display text-2xl mb-1 text-center">{t.welcomeBack}</h1>
          <p className="text-stone-500 text-sm mb-6 text-center">{t.signInToContinue}</p>

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5 block">{t.email}</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (loginError) clearError(); }}
                  placeholder={t.emailPlaceholder}
                  autoComplete="email"
                  autoCapitalize="none"
                  className="w-full bg-stone-50 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] uppercase tracking-widest text-stone-500">{t.password}</label>
                <button
                  type="button"
                  onClick={onGoForgot}
                  className="text-[10px] font-medium hover:underline"
                  style={{ color: BRAND_PURPLE }}
                >
                  {t.forgotPassword}
                </button>
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (loginError) clearError(); }}
                  placeholder={t.passwordPlaceholder}
                  autoComplete="current-password"
                  className="w-full bg-stone-50 rounded-lg pl-9 pr-10 py-2.5 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="text-xs text-center py-2 px-3 rounded-lg flex items-center justify-center gap-1.5" style={{ background: "#F2E2E2", color: "#9C5757" }}>
                <AlertCircle size={12} />
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={!email.trim() || !password || submitting}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white disabled:opacity-40 transition-opacity"
              style={{ background: BRAND_PURPLE }}
            >
              {t.signIn}
            </button>
          </form>

          <div className="mt-5 pt-4 text-center text-xs text-stone-500" style={{ borderTop: "1px solid rgba(28,27,26,0.06)" }}>
            {t.noAccount}{" "}
            <button
              onClick={onGoSignup}
              className="font-semibold hover:underline"
              style={{ color: BRAND_PURPLE }}
            >
              {t.signUp}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoCredRow({ label, email, password, onClick, accent }) {
  return (
    <button
      onClick={() => onClick(email, password)}
      className="w-full bg-white/70 rounded-xl p-2.5 text-left card-shadow hover:bg-white transition-all flex items-center gap-2"
      style={{ border: "1px solid rgba(28,27,26,0.04)" }}
    >
      <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: accent }} />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium truncate">{label}</div>
        <div className="text-[10px] text-stone-500 truncate font-mono">{email} · {password}</div>
      </div>
      <ChevronRight size={11} className="text-stone-400 flex-shrink-0" />
    </button>
  );
}

// ---------- SIGN UP ----------
function SignUp({ t, onSignUp, onBackToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(e) {
    if (e) e.preventDefault();
    setError("");
    if (!name.trim()) { setError(t.nameRequired); return; }
    if (!email.trim()) { setError(t.emailRequired); return; }
    if (password.length < 6) { setError(t.passwordTooShort); return; }
    if (password !== confirmPwd) { setError(t.passwordsDontMatch); return; }
    setSubmitting(true);
    const result = await onSignUp({ name, phone, email, password });
    setSubmitting(false);
    if (!result.success) setError(result.error);
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-5 pt-20 pb-12" style={{ background: "#F5F1EA" }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-7">
          <img src={LOGO_DATA_URL} alt="Icon Produce LLC" className="w-44 h-auto" draggable={false} />
        </div>

        <div className="bg-white rounded-3xl p-6 card-shadow">
          <button
            onClick={onBackToLogin}
            className="flex items-center gap-1 text-stone-500 text-xs mb-4 hover:text-stone-700"
          >
            <ArrowLeft size={12} /> {t.backToLogin}
          </button>

          <h1 className="display text-2xl mb-1 text-center">{t.createAccount}</h1>
          <p className="text-stone-500 text-sm mb-6 text-center">{t.createAccountSubtitle}</p>

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5 block">{t.fullName}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (error) setError(""); }}
                placeholder={t.repName}
                autoFocus
                className="w-full bg-stone-50 rounded-lg px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5 block">{t.email}</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                  placeholder={t.emailPlaceholder}
                  autoCapitalize="none"
                  className="w-full bg-stone-50 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5 block">{t.phoneOptional}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555-0100"
                className="w-full bg-stone-50 rounded-lg px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5 block">{t.password}</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (error) setError(""); }}
                  placeholder="••••••"
                  className="w-full bg-stone-50 rounded-lg pl-9 pr-10 py-2.5 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5 block">{t.confirmPasswordLabel}</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPwd}
                  onChange={(e) => { setConfirmPwd(e.target.value); if (error) setError(""); }}
                  placeholder="••••••"
                  className="w-full bg-stone-50 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="text-xs text-center py-2 px-3 rounded-lg flex items-center justify-center gap-1.5" style={{ background: "#F2E2E2", color: "#9C5757" }}>
                <AlertCircle size={12} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
              style={{ background: BRAND_PURPLE }}
            >
              {t.createAccountBtn}
            </button>
          </form>

          <div className="mt-5 pt-4 text-center text-xs text-stone-500" style={{ borderTop: "1px solid rgba(28,27,26,0.06)" }}>
            {t.haveAccount}{" "}
            <button onClick={onBackToLogin} className="font-semibold hover:underline" style={{ color: BRAND_PURPLE }}>
              {t.signIn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- FORGOT PASSWORD / EMAIL ----------
function Forgot({ t, onResetPassword, onLookupEmail, onBackToLogin }) {
  const [tab, setTab] = useState("password");

  return (
    <div className="min-h-screen flex flex-col items-center px-5 pt-20 pb-12" style={{ background: "#F5F1EA" }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-7">
          <img src={LOGO_DATA_URL} alt="Icon Produce LLC" className="w-44 h-auto" draggable={false} />
        </div>

        <div className="bg-white rounded-3xl p-6 card-shadow">
          <button
            onClick={onBackToLogin}
            className="flex items-center gap-1 text-stone-500 text-xs mb-4 hover:text-stone-700"
          >
            <ArrowLeft size={12} /> {t.backToLogin}
          </button>

          <h1 className="display text-2xl mb-1 text-center">{t.forgotTitle}</h1>
          <p className="text-stone-500 text-sm mb-5 text-center">{t.forgotSubtitle}</p>

          <div className="flex gap-1 mb-5 bg-stone-50 rounded-xl p-1">
            <button
              onClick={() => setTab("password")}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${tab === "password" ? "text-white" : "text-stone-600"}`}
              style={{ background: tab === "password" ? BRAND_PURPLE : "transparent" }}
            >
              {t.forgotPwdTab}
            </button>
            <button
              onClick={() => setTab("email")}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${tab === "email" ? "text-white" : "text-stone-600"}`}
              style={{ background: tab === "email" ? BRAND_PURPLE : "transparent" }}
            >
              {t.forgotEmailTab}
            </button>
          </div>

          {tab === "password" ? (
            <ResetPasswordPanel t={t} onResetPassword={onResetPassword} />
          ) : (
            <FindEmailPanel t={t} onLookupEmail={onLookupEmail} />
          )}

          <div className="mt-5 pt-4 text-[11px] text-center text-stone-400" style={{ borderTop: "1px solid rgba(28,27,26,0.06)" }}>
            {t.contactAdmin}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResetPasswordPanel({ t, onResetPassword }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function continueStep(e) {
    if (e) e.preventDefault();
    if (!email.trim()) { setError(t.emailRequired); return; }
    setError("");
    setStep("newPassword");
  }

  async function reset(e) {
    if (e) e.preventDefault();
    setError("");
    if (newPassword.length < 6) { setError(t.passwordTooShort); return; }
    if (newPassword !== confirmPwd) { setError(t.passwordsDontMatch); return; }
    setSubmitting(true);
    const result = await onResetPassword(email, newPassword);
    setSubmitting(false);
    if (!result.success) {
      setError(result.error);
      setStep("email");
    }
  }

  if (step === "email") {
    return (
      <form onSubmit={continueStep} className="space-y-3">
        <p className="text-xs text-stone-600">{t.pwdResetIntro}</p>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5 block">{t.email}</label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
              placeholder={t.emailPlaceholder}
              autoFocus
              autoCapitalize="none"
              className="w-full bg-stone-50 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none"
            />
          </div>
        </div>
        {error && (
          <div className="text-xs text-center py-2 px-3 rounded-lg" style={{ background: "#F2E2E2", color: "#9C5757" }}>{error}</div>
        )}
        <button
          type="submit"
          disabled={!email.trim()}
          className="w-full py-3 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
          style={{ background: BRAND_PURPLE }}
        >
          {t.continueBtn}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={reset} className="space-y-3">
      <div className="bg-stone-50 rounded-lg p-3 text-xs text-stone-600 flex items-center gap-2">
        <Mail size={12} className="text-stone-400 flex-shrink-0" />
        <span className="truncate font-mono">{email}</span>
        <button
          type="button"
          onClick={() => { setStep("email"); setNewPassword(""); setConfirmPwd(""); }}
          className="ml-auto text-[10px] font-semibold flex-shrink-0"
          style={{ color: BRAND_PURPLE }}
        >
          {t.change}
        </button>
      </div>
      <div>
        <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5 block">{t.newPasswordLabel}</label>
        <div className="relative">
          <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            autoFocus
            onChange={(e) => { setNewPassword(e.target.value); if (error) setError(""); }}
            placeholder="••••••"
            className="w-full bg-stone-50 rounded-lg pl-9 pr-10 py-2.5 text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 p-1"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>
      <div>
        <label className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5 block">{t.confirmPasswordLabel}</label>
        <div className="relative">
          <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPwd}
            onChange={(e) => { setConfirmPwd(e.target.value); if (error) setError(""); }}
            placeholder="••••••"
            className="w-full bg-stone-50 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none"
          />
        </div>
      </div>
      {error && (
        <div className="text-xs text-center py-2 px-3 rounded-lg" style={{ background: "#F2E2E2", color: "#9C5757" }}>{error}</div>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
        style={{ background: BRAND_PURPLE }}
      >
        {t.resetPwdBtn}
      </button>
    </form>
  );
}

function FindEmailPanel({ t, onLookupEmail }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState(null);

  function search(e) {
    if (e) e.preventDefault();
    const result = onLookupEmail(searchTerm);
    setMatches(result);
  }

  return (
    <form onSubmit={search} className="space-y-3">
      <p className="text-xs text-stone-600">{t.emailFindIntro}</p>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setMatches(null); }}
          placeholder={`${t.fullName} / ${t.phone}`}
          autoFocus
          className="w-full bg-stone-50 rounded-lg px-3 py-2.5 text-sm outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={!searchTerm.trim()}
        className="w-full py-3 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
        style={{ background: BRAND_PURPLE }}
      >
        {t.findEmailBtn}
      </button>

      {matches !== null && (
        <div className="pt-2">
          {matches.length === 0 ? (
            <div className="text-xs text-center py-3 px-3 rounded-lg" style={{ background: "#F2E2E2", color: "#9C5757" }}>
              {t.noMatchesFound}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[10px] uppercase tracking-widest text-stone-500">
                {matches.length === 1 ? t.foundOneAccount : t.foundManyAccounts(matches.length)}
              </div>
              {matches.map((m) => (
                <div key={m.id} className="bg-stone-50 rounded-lg p-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: BRAND_PURPLE + "15", color: BRAND_PURPLE }}>
                    <Mail size={12} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{m.name}</div>
                    <div className="text-[11px] text-stone-600 truncate font-mono">{m.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </form>
  );
}

// ---------- ADMIN HOME ----------
function AdminHome({ t, currentUser, leads, tasks, pendingProfiles, reminders, clients, vendors, onCreateTask, onCreateClient, onCreateLead, onPick }) {
  const [showQuickTask, setShowQuickTask] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const pendingCount = (leads || []).filter((l) => l.status === "pending").length;
  const pendingUsersCount = (pendingProfiles || []).length;
  const todayKeyStr = todayKey();
  const overdueTasks = (tasks || []).filter((tk) => !tk.completed && tk.dueDate && tk.dueDate < todayKeyStr).length;
  const todayTasksCount = (tasks || []).filter((tk) => !tk.completed && tk.dueDate === todayKeyStr).length;
  const openTasksCount = (tasks || []).filter((tk) => !tk.completed).length;
  const archivedCount = (clients || []).filter((c) => c.archived).length;
  const removalRequestsCount = (clients || []).filter((c) => c.removalRequested && !c.archived).length;

  // Reminders due now (overdue + pending)
  const now = new Date();
  const overdueReminders = (reminders || []).filter((r) => r.status === "pending" && new Date(r.scheduledFor) < now).length;
  const upcomingReminders = (reminders || []).filter((r) => r.status === "pending").length;
  return (
    <div className="max-w-md mx-auto px-5 pt-12 pb-24">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">{prettyDate(t.locale)}</div>
        <h1 className="display text-5xl leading-none mb-2">
          {t.welcomeUser((currentUser?.name || "").split(" ")[0] || t.roleManager)}
        </h1>
        <p className="text-stone-600 text-sm font-mono">{currentUser.email}</p>
        <p className="text-stone-500 text-sm mt-3">{t.pickArea}</p>
      </div>

      {pendingUsersCount > 0 && (
        <button
          onClick={() => onPick("approvals")}
          className="w-full text-left rounded-2xl p-4 mb-3 flex items-center justify-between card-shadow transition-all hover:translate-x-1"
          style={{ background: BRAND_PURPLE + "15", border: `1px solid ${BRAND_PURPLE}40` }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: BRAND_PURPLE + "30" }}>
              <UserPlus size={16} style={{ color: BRAND_PURPLE }} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: BRAND_PURPLE }}>
                Pending users
              </div>
              <div className="text-sm" style={{ color: "#3D2160" }}>
                {pendingUsersCount} {pendingUsersCount === 1 ? "user" : "users"} waiting for approval
              </div>
            </div>
          </div>
          <ChevronRight size={16} style={{ color: BRAND_PURPLE }} />
        </button>
      )}

      {removalRequestsCount > 0 && (
        <button
          onClick={() => onPick("removal-requests")}
          className="w-full text-left rounded-2xl p-4 mb-3 flex items-center justify-between card-shadow transition-all hover:translate-x-1"
          style={{ background: "#F2E2E2", border: "1px solid #D8A0A0" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#D8A0A0" }}>
              <Trash2 size={16} style={{ color: "#7A3D3D" }} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#7A3D3D" }}>
                {t.removalRequests}
              </div>
              <div className="text-sm" style={{ color: "#5C2929" }}>
                {removalRequestsCount} {removalRequestsCount === 1 ? (t.requestPending || "request pending") : (t.requestsPending || "requests pending")}
              </div>
            </div>
          </div>
          <ChevronRight size={16} style={{ color: "#7A3D3D" }} />
        </button>
      )}

      {pendingCount > 0 && (
        <button
          onClick={() => onPick("leads")}
          className="w-full text-left rounded-2xl p-4 mb-3 flex items-center justify-between card-shadow transition-all hover:translate-x-1"
          style={{ background: "#FFF5D6", border: "1px solid #F5D785" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#F5D785" }}>
              <Bell size={16} style={{ color: "#8B6F1A" }} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#8B6F1A" }}>
                {t.pendingApprovals}
              </div>
              <div className="text-sm" style={{ color: "#5C4A1A" }}>{t.pendingApprovalsCount(pendingCount)}</div>
            </div>
          </div>
          <ChevronRight size={16} style={{ color: "#8B6F1A" }} />
        </button>
      )}

      {overdueTasks > 0 && (
        <button
          onClick={() => onPick("tasks")}
          className="w-full text-left rounded-2xl p-4 mb-3 flex items-center justify-between card-shadow transition-all hover:translate-x-1"
          style={{ background: "#F2E2E2", border: "1px solid #E2B5B5" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#E2B5B5" }}>
              <AlertCircle size={16} style={{ color: "#9C5757" }} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#9C5757" }}>
                {t.overdueTasks}
              </div>
              <div className="text-sm" style={{ color: "#5C2A2A" }}>{t.nOverdue(overdueTasks)}</div>
            </div>
          </div>
          <ChevronRight size={16} style={{ color: "#9C5757" }} />
        </button>
      )}

      <div className="space-y-3">
        <button
          onClick={() => onPick("admin")}
          className="w-full text-left rounded-2xl p-5 flex items-center justify-between card-shadow transition-all hover:translate-x-1"
          style={{ background: "#1C1B1A", color: "#F5F1EA" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,215,0,0.15)" }}>
              <Crown size={20} style={{ color: "#FFD700" }} />
            </div>
            <div>
              <div className="font-semibold">{t.managerDashboard}</div>
              <div className="text-xs opacity-70">{t.reportsSupervision}</div>
            </div>
          </div>
          <ChevronRight size={18} className="opacity-70" />
        </button>

        <button
          onClick={() => onPick("insights")}
          className="w-full text-left rounded-2xl p-5 flex items-center justify-between card-shadow transition-all hover:translate-x-1"
          style={{ background: "linear-gradient(135deg, #5F2F9D 0%, #7B4DBF 100%)", color: "white" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}>
              <BarChart3 size={20} />
            </div>
            <div>
              <div className="font-semibold">{t.salesInsights || "Sales Insights"}</div>
              <div className="text-xs opacity-80">{t.salesInsightsTeamSub || "Team-wide ordering patterns"}</div>
            </div>
          </div>
          <ChevronRight size={18} className="opacity-90" />
        </button>

        <WeeklyReportButton
          t={t}
          scope="manager"
          scopeName="Icon Produce"
          vendors={vendors}
          clients={clients}
          tasks={tasks}
        />

        {/* Quick action row — fast access to common manager tasks */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setShowAddClient(true)}
            className="bg-white rounded-xl py-3 px-2 flex flex-col items-center justify-center card-shadow transition-all hover:scale-105 active:scale-95"
            style={{ border: `1px solid ${BRAND_GREEN}30` }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{ background: BRAND_GREEN + "20" }}>
              <Plus size={16} style={{ color: BRAND_GREEN }} />
            </div>
            <div className="text-[11px] font-semibold" style={{ color: BRAND_GREEN }}>
              {t.addClient || "Add client"}
            </div>
          </button>
          <button
            onClick={() => setShowAddLead(true)}
            className="bg-white rounded-xl py-3 px-2 flex flex-col items-center justify-center card-shadow transition-all hover:scale-105 active:scale-95"
            style={{ border: "1px solid #F5D78580" }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{ background: "#FFF5D6" }}>
              <ClipboardList size={16} style={{ color: "#8B6F1A" }} />
            </div>
            <div className="text-[11px] font-semibold" style={{ color: "#8B6F1A" }}>
              {t.addLead || "Add lead"}
            </div>
          </button>
          <button
            onClick={() => setShowAddVendor(true)}
            className="bg-white rounded-xl py-3 px-2 flex flex-col items-center justify-center card-shadow transition-all hover:scale-105 active:scale-95"
            style={{ border: `1px solid ${BRAND_PURPLE}30` }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{ background: BRAND_PURPLE + "20" }}>
              <UserPlus size={16} style={{ color: BRAND_PURPLE }} />
            </div>
            <div className="text-[11px] font-semibold" style={{ color: BRAND_PURPLE }}>
              {t.addVendor || "Add vendor"}
            </div>
          </button>
        </div>
        <button
          onClick={() => onPick("leads")}
          className="w-full text-left bg-white rounded-2xl p-5 flex items-center justify-between card-shadow transition-all hover:translate-x-1"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#FFF5D6" }}>
              <ClipboardList size={20} style={{ color: "#8B6F1A" }} />
            </div>
            <div>
              <div className="font-semibold">{t.leadsKanban}</div>
              <div className="text-xs text-stone-500">{t.pipeline}</div>
            </div>
          </div>
          {pendingCount > 0 ? (
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: "#9C5757", color: "white" }}>
              {pendingCount}
            </div>
          ) : (
            <ChevronRight size={18} className="text-stone-400" />
          )}
        </button>
        <button
          onClick={() => onPick("tasks")}
          className="w-full text-left bg-white rounded-2xl p-5 flex items-center justify-between card-shadow transition-all hover:translate-x-1"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#E5EAF2" }}>
              <ListTodo size={20} style={{ color: "#5A6B85" }} />
            </div>
            <div>
              <div className="font-semibold">{t.tasks}</div>
              <div className="text-xs text-stone-500">
                {overdueTasks > 0
                  ? t.nOverdue(overdueTasks)
                  : todayTasksCount > 0
                    ? t.nDueToday(todayTasksCount)
                    : openTasksCount > 0
                      ? `${openTasksCount} ${openTasksCount === 1 ? (t.openTask || "open task") : (t.openTasks || "open tasks")}`
                      : t.noTasks || "No active tasks"}
              </div>
            </div>
          </div>
          {overdueTasks > 0 ? (
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: "#9C5757", color: "white" }}>
              {overdueTasks}
            </div>
          ) : todayTasksCount > 0 ? (
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: "#5A6B85", color: "white" }}>
              {todayTasksCount}
            </div>
          ) : openTasksCount > 0 ? (
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium" style={{ background: "#F0EAE0", color: "#8B7355" }}>
              {openTasksCount}
            </div>
          ) : (
            <ChevronRight size={18} className="text-stone-400" />
          )}
        </button>
        <button
          onClick={() => onPick("reminders")}
          className="w-full text-left bg-white rounded-2xl p-5 flex items-center justify-between card-shadow transition-all hover:translate-x-1"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#FFF5D6" }}>
              <Bell size={20} style={{ color: "#B8860B" }} />
            </div>
            <div>
              <div className="font-semibold">{t.smsReminders}</div>
              <div className="text-xs text-stone-500">
                {overdueReminders > 0
                  ? `${overdueReminders} ${t.overdueRemindersToSend.toLowerCase()}`
                  : upcomingReminders > 0
                    ? `${upcomingReminders} ${t.upcomingReminders.toLowerCase()}`
                    : t.smsRemindersSub
                }
              </div>
            </div>
          </div>
          {overdueReminders > 0 ? (
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: "#B8860B", color: "white" }}>
              {overdueReminders}
            </div>
          ) : (
            <ChevronRight size={18} className="text-stone-400" />
          )}
        </button>
        <button
          onClick={() => onPick("archived")}
          className="w-full text-left bg-white rounded-2xl p-5 flex items-center justify-between card-shadow transition-all hover:translate-x-1"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#F0EAE0" }}>
              <Inbox size={20} style={{ color: "#8B7355" }} />
            </div>
            <div>
              <div className="font-semibold">{t.archivedClients}</div>
              <div className="text-xs text-stone-500">
                {archivedCount > 0 ? `${archivedCount} ${t.archivedClients.toLowerCase()}` : t.archivedClientsSub}
              </div>
            </div>
          </div>
          {archivedCount > 0 ? (
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: "#8B7355", color: "white" }}>
              {archivedCount}
            </div>
          ) : (
            <ChevronRight size={18} className="text-stone-400" />
          )}
        </button>
        <button
          onClick={() => onPick("setup")}
          className="w-full text-left bg-white rounded-2xl p-5 flex items-center justify-between card-shadow transition-all hover:translate-x-1"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: BRAND_PURPLE + "15" }}>
              <Settings size={20} style={{ color: BRAND_PURPLE }} />
            </div>
            <div>
              <div className="font-semibold">{t.settings}</div>
              <div className="text-xs text-stone-500">{t.repsClients}</div>
            </div>
          </div>
          <ChevronRight size={18} className="text-stone-400" />
        </button>
      </div>

      {/* Floating Action Button — Quick Add Task */}
      {onCreateTask && (
        <button
          onClick={() => setShowQuickTask(true)}
          className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
          style={{ background: BRAND_PURPLE, color: "#fff", boxShadow: "0 4px 12px rgba(95,47,157,0.4)" }}
          title={t.quickAddTask || "Quick add task"}
        >
          <Plus size={24} />
        </button>
      )}

      {/* Quick Task Modal */}
      {showQuickTask && (
        <QuickTaskModal
          t={t}
          vendors={vendors || []}
          clients={clients || []}
          onSave={async (payload) => {
            await onCreateTask(payload);
            setShowQuickTask(false);
          }}
          onCancel={() => setShowQuickTask(false)}
        />
      )}

      {/* Quick Add Client Modal */}
      {showAddClient && (
        <AddClientModal
          t={t}
          vendors={vendors || []}
          onSave={async (payload) => {
            if (onCreateClient) await onCreateClient(payload);
            setShowAddClient(false);
          }}
          onCancel={() => setShowAddClient(false)}
        />
      )}

      {/* Quick Add Lead Modal */}
      {showAddLead && (
        <AddLeadModal
          t={t}
          onSave={async (payload) => {
            if (onCreateLead) await onCreateLead(payload);
            setShowAddLead(false);
          }}
          onCancel={() => setShowAddLead(false)}
        />
      )}

      {/* Add Vendor Info Modal — explains how to invite vendors via signup link */}
      {showAddVendor && (
        <AddVendorInfoModal
          t={t}
          onClose={() => setShowAddVendor(false)}
        />
      )}
    </div>
  );
}

// Quick task creation modal — accessible from FAB on home
function QuickTaskModal({ t, vendors, clients, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [clientId, setClientId] = useState("");
  const [dueDate, setDueDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const visibleClients = vendorId ? clients.filter((c) => c.vendorId === vendorId && !c.archived) : clients.filter((c) => !c.archived);

  async function submit() {
    if (!title.trim()) return;
    setSubmitting(true);
    await onSave({
      title: title.trim(),
      dueDate: dueDate || null,
      vendorId: vendorId || null,
      clientId: clientId || null,
      note: note.trim() || null,
    });
    setSubmitting(false);
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onCancel}>
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-widest text-stone-500 flex items-center gap-1.5">
              <ListTodo size={12} /> {t.quickAddTask || "Quick add task"}
            </div>
            <button onClick={onCancel} className="text-stone-400 hover:text-stone-700 p-1">
              <X size={16} />
            </button>
          </div>

          {/* Title */}
          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.taskTitle || "Title"}</div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.taskTitlePlaceholder || "Task title…"}
              autoFocus
              className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Due date */}
          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.dueDate || "Due date"}</div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Vendor (optional) */}
          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.assignToVendor || "Assign to vendor"} <span className="text-stone-400 normal-case">({t.optional || "optional"})</span></div>
            <select
              value={vendorId}
              onChange={(e) => { setVendorId(e.target.value); setClientId(""); }}
              className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="">{t.unassigned || "Unassigned"}</option>
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>

          {/* Client (optional) */}
          {visibleClients.length > 0 && (
            <div className="mb-3">
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.relatedClient || "Related client"} <span className="text-stone-400 normal-case">({t.optional || "optional"})</span></div>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none"
              >
                <option value="">{t.noneSelected || "None"}</option>
                {visibleClients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Note (optional) */}
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.notesOptional || "Notes"} <span className="text-stone-400 normal-case">({t.optional || "optional"})</span></div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.taskNotePlaceholder || "Additional details…"}
              rows={2}
              className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg bg-stone-100 text-sm font-medium text-stone-700">
              {t.cancel}
            </button>
            <button
              onClick={submit}
              disabled={submitting || !title.trim()}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
              style={{ background: BRAND_PURPLE }}
            >
              {submitting ? (t.saving || "Saving…") : (t.createTask || "Create task")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// AddClientModal — quick-add client form (compact, complete fields)
// ============================================
function AddClientModal({ t, vendors, onSave, onCancel }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vendorId, setVendorId] = useState(vendors[0]?.id || "");
  const [frequency, setFrequency] = useState("weekly");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function submit() {
    if (!name.trim()) { setError(t.nameRequired || "Name is required"); return; }
    if (!vendorId) { setError(t.vendorRequired || "Please assign a vendor"); return; }
    setSubmitting(true);
    setError(null);
    try {
      await onSave({
        id: `c_${Date.now()}`,
        name: name.trim(),
        phone: phone.trim(),
        vendorId,
        frequency,
        tags: [],
        longNote: notes.trim(),
      });
    } catch (e) {
      setError(e?.message || "Failed to save");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onCancel}>
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-widest text-stone-500 flex items-center gap-1.5" style={{ color: BRAND_GREEN }}>
              <Plus size={12} /> {t.addClient || "Add client"}
            </div>
            <button onClick={onCancel} className="text-stone-400 hover:text-stone-700 p-1">
              <X size={16} />
            </button>
          </div>

          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.clientName || "Client name"} *</div>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.clientNamePlaceholder || "e.g. Sunrise Distribution"}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.phone || "Phone"}</div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.clientPhonePlaceholder || "305-555-1234"}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.assignedVendor || "Assigned vendor"} *</div>
            <select
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value)}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm bg-white focus:outline-none focus:border-stone-400"
            >
              {vendors.length === 0 && <option value="">{t.noVendorsYet || "No vendors yet"}</option>}
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.frequency || "Frequency"}</div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { key: "daily", label: t.frequencyDaily || "Daily" },
                { key: "weekly", label: t.frequencyWeekly || "Weekly" },
                { key: "biweekly", label: t.frequencyBiweekly || "Biweekly" },
                { key: "monthly", label: t.frequencyMonthly || "Monthly" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFrequency(f.key)}
                  className="py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: frequency === f.key ? BRAND_GREEN : "white",
                    color: frequency === f.key ? "white" : "#3D3733",
                    border: `1px solid ${frequency === f.key ? BRAND_GREEN : "rgba(0,0,0,0.1)"}`,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.notes || "Notes"}</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.notesPlaceholder || "Optional context, preferences, etc."}
              rows={2}
              className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400 resize-none"
            />
          </div>

          {error && (
            <div className="mb-3 px-3 py-2 rounded-lg text-xs" style={{ background: "#F2E2E2", color: "#9C5757" }}>
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold border border-stone-200 text-stone-700"
            >
              {t.cancel || "Cancel"}
            </button>
            <button
              onClick={submit}
              disabled={submitting || !name.trim() || !vendorId}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
              style={{ background: BRAND_GREEN }}
            >
              {submitting ? "…" : (t.save || "Save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// AddLeadModal — quick-add lead form (just name + phone + note)
// ============================================
function AddLeadModal({ t, onSave, onCancel }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function submit() {
    if (!name.trim()) { setError(t.nameRequired || "Name is required"); return; }
    setSubmitting(true);
    setError(null);
    try {
      await onSave({
        name: name.trim(),
        phone: phone.trim(),
        note: note.trim(),
      });
    } catch (e) {
      setError(e?.message || "Failed to save");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onCancel}>
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-widest flex items-center gap-1.5" style={{ color: "#8B6F1A" }}>
              <ClipboardList size={12} /> {t.addLead || "Add lead"}
            </div>
            <button onClick={onCancel} className="text-stone-400 hover:text-stone-700 p-1">
              <X size={16} />
            </button>
          </div>

          <p className="text-[11px] text-stone-500 mb-4">{t.addLeadHelper || "Add a prospect that needs to be approved and assigned to a vendor."}</p>

          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.leadName || "Lead name"} *</div>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.leadNamePlaceholder || "e.g. Mike's Pizza"}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.phone || "Phone"}</div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.clientPhonePlaceholder || "305-555-1234"}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.notes || "Notes"}</div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.leadNotesPlaceholder || "Where did this lead come from? Any context?"}
              rows={2}
              className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400 resize-none"
            />
          </div>

          {error && (
            <div className="mb-3 px-3 py-2 rounded-lg text-xs" style={{ background: "#F2E2E2", color: "#9C5757" }}>
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg text-sm font-semibold border border-stone-200 text-stone-700">
              {t.cancel || "Cancel"}
            </button>
            <button
              onClick={submit}
              disabled={submitting || !name.trim()}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
              style={{ background: "#8B6F1A" }}
            >
              {submitting ? "…" : (t.save || "Save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// AddVendorInfoModal — informational only (vendors must self-signup)
// ============================================
function AddVendorInfoModal({ t, onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-widest flex items-center gap-1.5" style={{ color: BRAND_PURPLE }}>
              <UserPlus size={12} /> {t.addVendor || "Add vendor"}
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-700 p-1">
              <X size={16} />
            </button>
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: BRAND_PURPLE + "10" }}>
            <p className="text-sm text-stone-700 leading-relaxed mb-3">
              {t.addVendorInfo1 || "To add a new vendor to your team, share your CRM signup link with them:"}
            </p>
            <div className="bg-white rounded-lg px-3 py-2 mb-3 text-xs font-mono text-stone-700 break-all border border-stone-200">
              {window.location.origin + "/signup"}
            </div>
            <p className="text-[12px] text-stone-600 leading-relaxed">
              {t.addVendorInfo2 || "When they sign up, you'll get a notification in the home screen to approve them. After approval they'll appear in your vendor list and can start receiving clients."}
            </p>
          </div>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.origin + "/signup");
            }}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white mb-2"
            style={{ background: BRAND_PURPLE }}
          >
            {t.copySignupLink || "Copy signup link"}
          </button>

          <button onClick={onClose} className="w-full py-2.5 rounded-lg text-sm font-semibold border border-stone-200 text-stone-700">
            {t.close || "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- REMINDERS VIEW (Manager — schedule SMS reminders) ----------

// Helper: build the reminder message text
function buildReminderMessage({ vendor, customMessage, includePendingClients, pendingClients, t }) {
  const lines = [];
  const greeting = `Hi ${vendor?.name?.split(" ")[0] || "team"},`;
  lines.push(greeting);
  lines.push("");

  if (customMessage && customMessage.trim()) {
    lines.push(customMessage.trim());
    lines.push("");
  }

  if (includePendingClients && pendingClients && pendingClients.length > 0) {
    lines.push(`You still have ${pendingClients.length} client${pendingClients.length === 1 ? "" : "s"} to call today:`);
    pendingClients.forEach((c) => {
      lines.push(`- ${c.name}`);
    });
  } else if (includePendingClients) {
    lines.push("All your clients have been contacted today. Great job!");
  }

  lines.push("");
  lines.push("— Icon Produce CRM");
  return lines.join("\n");
}

// Helper: get pending clients (no call today) for a vendor
function getPendingClientsForVendor(vendorId, clients, interactions) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const myClients = clients.filter((c) => c.vendorId === vendorId && !c.archived);
  const calledToday = new Set(
    interactions
      .filter((i) => i.vendorId === vendorId && i.channel === "call" && i.timestamp >= todayStart.getTime())
      .map((i) => i.clientId)
  );
  return myClients.filter((c) => !calledToday.has(c.id));
}

function ReminderForm({ t, vendors, clients, interactions, onSave, onCancel }) {
  const [vendorId, setVendorId] = useState(vendors[0]?.id || "");
  const [scheduleType, setScheduleType] = useState("at_time"); // "at_time" or "in_hours"
  const [scheduleTime, setScheduleTime] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 30);
    return d.toTimeString().slice(0, 5); // HH:MM
  });
  const [scheduleDate, setScheduleDate] = useState(() => {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  });
  const [hoursOffset, setHoursOffset] = useState(2);
  const [includePending, setIncludePending] = useState(true);
  const [customMessage, setCustomMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedVendor = vendors.find((v) => v.id === vendorId);
  const pendingClients = vendorId ? getPendingClientsForVendor(vendorId, clients, interactions) : [];
  const previewMessage = buildReminderMessage({
    vendor: selectedVendor,
    customMessage,
    includePendingClients: includePending,
    pendingClients,
    t,
  });

  function computeScheduledFor() {
    if (scheduleType === "at_time") {
      const dt = new Date(`${scheduleDate}T${scheduleTime}`);
      return dt.toISOString();
    } else {
      const dt = new Date();
      dt.setHours(dt.getHours() + Number(hoursOffset));
      return dt.toISOString();
    }
  }

  async function submit() {
    if (!vendorId) return;
    setSubmitting(true);
    const result = await onSave({
      vendorId,
      scheduledFor: computeScheduledFor(),
      customMessage: customMessage.trim() || null,
      includePendingClients: includePending,
    });
    setSubmitting(false);
    if (result?.success) {
      onCancel();
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onCancel}>
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-widest text-stone-500 flex items-center gap-1.5">
              <Bell size={12} /> {t.newReminder}
            </div>
            <button onClick={onCancel} className="text-stone-400 hover:text-stone-600 p-1"><X size={16} /></button>
          </div>

          {/* Vendor selector */}
          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.reminderVendor}</div>
            <select value={vendorId} onChange={(e) => setVendorId(e.target.value)} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none">
              {vendors.length === 0 ? (
                <option value="">{t.noVendorsYet}</option>
              ) : (
                vendors.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}{v.phone ? "" : ` (${t.noPhone})`}</option>
                ))
              )}
            </select>
            {selectedVendor && !selectedVendor.phone && (
              <div className="text-[11px] mt-1 flex items-center gap-1" style={{ color: "#9C5757" }}>
                <AlertCircle size={11} /> {t.vendorNoPhoneWarning}
              </div>
            )}
          </div>

          {/* Schedule type toggle */}
          <div className="grid grid-cols-2 gap-1 mb-3 bg-stone-100 rounded-lg p-1">
            <button onClick={() => setScheduleType("at_time")} className={`py-1.5 rounded-md text-xs font-medium ${scheduleType === "at_time" ? "text-white" : "text-stone-600"}`} style={{ background: scheduleType === "at_time" ? BRAND_PURPLE : "transparent" }}>
              {t.atSpecificTime}
            </button>
            <button onClick={() => setScheduleType("in_hours")} className={`py-1.5 rounded-md text-xs font-medium ${scheduleType === "in_hours" ? "text-white" : "text-stone-600"}`} style={{ background: scheduleType === "in_hours" ? BRAND_PURPLE : "transparent" }}>
              {t.inXHours}
            </button>
          </div>

          {/* Schedule inputs */}
          {scheduleType === "at_time" ? (
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.date}</div>
                <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.time}</div>
                <input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
              </div>
            </div>
          ) : (
            <div className="mb-3">
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.hoursFromNow}</div>
              <input type="number" min="1" max="48" value={hoursOffset} onChange={(e) => setHoursOffset(e.target.value)} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
              <div className="text-[10px] text-stone-400 mt-1">{t.willBeSentAt}: {new Date(Date.now() + Number(hoursOffset) * 60 * 60 * 1000).toLocaleString()}</div>
            </div>
          )}

          {/* Include pending clients toggle */}
          <label className="flex items-center justify-between p-3 bg-stone-50 rounded-lg mb-3 cursor-pointer">
            <div>
              <div className="text-sm font-medium">{t.includePendingClients}</div>
              <div className="text-[11px] text-stone-500 mt-0.5">{t.includePendingClientsHelp}</div>
            </div>
            <input
              type="checkbox"
              checked={includePending}
              onChange={(e) => setIncludePending(e.target.checked)}
              className="w-4 h-4 flex-shrink-0"
              style={{ accentColor: BRAND_PURPLE }}
            />
          </label>

          {/* Custom message */}
          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.customMessageOptional}</div>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder={t.customMessagePlaceholder}
              rows={2}
              className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none resize-none"
            />
          </div>

          {/* Preview */}
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.messagePreview}</div>
            <div className="bg-stone-50 rounded-lg p-3 text-xs text-stone-700 whitespace-pre-wrap">
              {previewMessage}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg bg-stone-100 text-sm font-medium text-stone-700">{t.cancel}</button>
            <button onClick={submit} disabled={submitting || !vendorId} className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: BRAND_PURPLE }}>
              {submitting ? t.scheduling : t.scheduleReminder}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReminderCard({ t, reminder, vendor, clients, interactions, onCancel, onDelete, onMarkSent }) {
  const scheduledDate = new Date(reminder.scheduledFor);
  const isPast = scheduledDate < new Date();
  const isPending = reminder.status === "pending";
  const isCancelled = reminder.status === "cancelled";
  const isSent = reminder.status === "sent";

  const pendingClients = vendor ? getPendingClientsForVendor(vendor.id, clients, interactions) : [];
  const previewMessage = buildReminderMessage({
    vendor,
    customMessage: reminder.customMessage,
    includePendingClients: reminder.includePendingClients,
    pendingClients,
    t,
  });

  function sendNow(channel) {
    if (!vendor || !vendor.phone) {
      alert(t.vendorHasNoPhone);
      return;
    }
    const cleanPhone = vendor.phone.replace(/[^0-9+]/g, "");
    if (channel === "whatsapp") {
      const cleanForWa = cleanPhone.replace(/[^0-9]/g, "");
      window.open(`https://wa.me/${cleanForWa}?text=${encodeURIComponent(previewMessage)}`, "_blank");
    } else {
      window.open(`sms:${cleanPhone}?body=${encodeURIComponent(previewMessage)}`, "_blank");
    }
    onMarkSent(reminder.id);
  }

  let statusColor = "#5A6B85";
  let statusBg = "#E5EAF2";
  let statusLabel = t.statusPending;
  if (isSent) { statusColor = "#73A626"; statusBg = "#E8F2D5"; statusLabel = t.statusSent; }
  else if (isCancelled) { statusColor = "#8B7355"; statusBg = "#F0EAE0"; statusLabel = t.statusCancelled; }
  else if (isPast && isPending) { statusColor = "#9C5757"; statusBg = "#F2E2E2"; statusLabel = t.statusOverdue; }

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow" style={{ borderLeft: `3px solid ${statusColor}` }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">{vendor?.name || t.unknownVendor}</div>
          <div className="text-xs text-stone-500 mt-0.5">
            {scheduledDate.toLocaleString()}
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: statusBg, color: statusColor }}>
          {statusLabel}
        </span>
      </div>

      {reminder.customMessage && (
        <div className="text-xs text-stone-600 italic mb-2 truncate">"{reminder.customMessage}"</div>
      )}

      {isPending && isPast && (
        <div className="space-y-2 mt-3">
          <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "#9C5757" }}>
            {t.sendNowVia}:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => sendNow("whatsapp")} className="py-2 rounded-lg text-xs font-medium text-white" style={{ background: "#25D366" }}>
              {t.sendViaWhatsApp}
            </button>
            <button onClick={() => sendNow("sms")} className="py-2 rounded-lg text-xs font-medium text-white" style={{ background: BRAND_PURPLE }}>
              {t.sendViaSms}
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-3 pt-2" style={{ borderTop: "1px solid rgba(28,27,26,0.06)" }}>
        {isPending && !isPast && (
          <button onClick={() => onCancel(reminder.id)} className="flex-1 py-1.5 rounded-md text-[11px] font-medium" style={{ background: "#F0EAE0", color: "#8B7355" }}>
            {t.cancelReminder}
          </button>
        )}
        <button onClick={() => onDelete(reminder.id)} className="px-3 py-1.5 rounded-md text-[11px] font-medium" style={{ background: "#F2E2E2", color: "#9C5757" }}>
          <Trash2 size={11} className="inline" />
        </button>
      </div>
    </div>
  );
}

function RemindersView({ t, reminders, vendors, clients, interactions, onCreate, onCancel, onDelete, onMarkSent, onBack }) {
  const [showForm, setShowForm] = useState(false);

  // Group reminders
  const now = new Date();
  const sortedReminders = [...reminders].sort((a, b) => new Date(b.scheduledFor) - new Date(a.scheduledFor));
  const overdue = sortedReminders.filter((r) => r.status === "pending" && new Date(r.scheduledFor) < now);
  const upcoming = sortedReminders.filter((r) => r.status === "pending" && new Date(r.scheduledFor) >= now)
    .sort((a, b) => new Date(a.scheduledFor) - new Date(b.scheduledFor));
  const completed = sortedReminders.filter((r) => r.status === "sent" || r.status === "cancelled");

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6 pb-24">
      <button onClick={onBack} className="flex items-center gap-1 text-stone-600 text-sm mb-6">
        <ArrowLeft size={16} /> {t.back}
      </button>

      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{prettyDate(t.locale)}</div>
          <h1 className="display text-3xl leading-tight flex items-center gap-2">
            <Bell size={22} /> {t.smsReminders}
          </h1>
          <p className="text-stone-500 text-sm mt-2">{t.smsRemindersSub}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold text-white flex-shrink-0"
          style={{ background: BRAND_PURPLE }}
        >
          <Plus size={13} /> {t.newReminder}
        </button>
      </div>

      {/* Twilio integration coming soon banner */}
      <div className="bg-white rounded-2xl p-3 card-shadow mb-5" style={{ borderLeft: `3px solid ${BRAND_PURPLE}` }}>
        <div className="text-[11px] flex items-start gap-2">
          <AlertCircle size={12} style={{ color: BRAND_PURPLE }} className="mt-0.5 flex-shrink-0" />
          <div className="text-stone-600">
            <span className="font-semibold" style={{ color: BRAND_PURPLE }}>{t.twilioComingSoon}</span> {t.manualSendForNowHelp}
          </div>
        </div>
      </div>

      {sortedReminders.length === 0 && (
        <div className="text-center py-12 text-stone-400 text-sm italic">{t.noRemindersYet}</div>
      )}

      {overdue.length > 0 && (
        <div className="mb-5">
          <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "#9C5757" }}>{t.overdueRemindersToSend}</div>
          <div className="space-y-2">
            {overdue.map((r) => {
              const vendor = vendors.find((v) => v.id === r.vendorId);
              return (
                <ReminderCard
                  key={r.id}
                  t={t}
                  reminder={r}
                  vendor={vendor}
                  clients={clients}
                  interactions={interactions}
                  onCancel={onCancel}
                  onDelete={onDelete}
                  onMarkSent={onMarkSent}
                />
              );
            })}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div className="mb-5">
          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">{t.upcomingReminders}</div>
          <div className="space-y-2">
            {upcoming.map((r) => {
              const vendor = vendors.find((v) => v.id === r.vendorId);
              return (
                <ReminderCard
                  key={r.id}
                  t={t}
                  reminder={r}
                  vendor={vendor}
                  clients={clients}
                  interactions={interactions}
                  onCancel={onCancel}
                  onDelete={onDelete}
                  onMarkSent={onMarkSent}
                />
              );
            })}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">{t.completedReminders}</div>
          <div className="space-y-2">
            {completed.slice(0, 10).map((r) => {
              const vendor = vendors.find((v) => v.id === r.vendorId);
              return (
                <ReminderCard
                  key={r.id}
                  t={t}
                  reminder={r}
                  vendor={vendor}
                  clients={clients}
                  interactions={interactions}
                  onCancel={onCancel}
                  onDelete={onDelete}
                  onMarkSent={onMarkSent}
                />
              );
            })}
          </div>
        </div>
      )}

      {showForm && (
        <ReminderForm
          t={t}
          vendors={vendors}
          clients={clients}
          interactions={interactions}
          onSave={onCreate}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

// Vendor's own phone setting (shown in vendor's view)
// Reusable button that triggers weekly PDF report generation.
// Props decide the scope:
//   - For manager: pass scope="manager", omit vendorIdFilter
//   - For vendor:  pass scope="vendor", vendorIdFilter={vendor.id}, scopeName={vendor.name}
function WeeklyReportButton({ t, scope, scopeName, vendors, clients, tasks, vendorIdFilter, variant = "card" }) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  async function handleGenerate() {
    setGenerating(true);
    setError(null);
    try {
      await generateWeeklyReportPDF({
        scope,
        scopeName: scopeName || "Icon Produce",
        vendors: vendors || [],
        clients: clients || [],
        tasks: tasks || [],
        vendorIdFilter,
        t,
      });
    } catch (e) {
      console.error("Weekly report generation failed:", e);
      setError(e.message || "Failed to generate report");
    } finally {
      setGenerating(false);
    }
  }

  if (variant === "card") {
    // Big card style — for prominent placement (manager home, vendor home)
    return (
      <div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full text-left rounded-2xl p-5 flex items-center justify-between card-shadow transition-all hover:translate-x-1 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #1C5E6E 0%, #2E8294 100%)", color: "white" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}>
              <FileText size={20} />
            </div>
            <div>
              <div className="font-semibold">{t.weeklyReport || "Weekly Report"}</div>
              <div className="text-xs opacity-80">
                {generating
                  ? (t.generatingPdf || "Generating PDF…")
                  : (t.weeklyReportSub || "Download last 7 days as PDF")}
              </div>
            </div>
          </div>
          {generating ? (
            <div className="text-xs opacity-90 font-semibold">…</div>
          ) : (
            <ChevronRight size={18} className="opacity-90" />
          )}
        </button>
        {error && (
          <div className="mt-2 text-xs px-3 py-2 rounded-lg" style={{ background: "#F2E2E2", color: "#9C5757" }}>
            {error}
          </div>
        )}
      </div>
    );
  }

  // Inline button variant (for use inside sections)
  return (
    <button
      onClick={handleGenerate}
      disabled={generating}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60"
      style={{ background: "#1C5E6E", color: "white" }}
    >
      <FileText size={14} />
      {generating ? (t.generatingPdf || "Generating…") : (t.weeklyReport || "Weekly Report")}
    </button>
  );
}

function VendorPhoneCard({ t, currentPhone, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(currentPhone || "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const ok = await onUpdate(draft.trim());
    setSaving(false);
    if (ok) setEditing(false);
  }

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow mb-4" style={{ borderLeft: `3px solid ${currentPhone ? "#73A626" : "#B8860B"}` }}>
      <div className="flex items-start gap-2.5">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: currentPhone ? "#E8F2D5" : "#FFF5D6" }}>
          <Phone size={14} style={{ color: currentPhone ? "#73A626" : "#B8860B" }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-widest" style={{ color: currentPhone ? "#73A626" : "#B8860B" }}>
            {t.yourPhoneNumber}
          </div>
          {editing ? (
            <div className="mt-2 space-y-2">
              <input
                type="tel"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="+1 555-123-4567"
                autoFocus
                className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none"
              />
              <div className="flex gap-2">
                <button onClick={() => { setEditing(false); setDraft(currentPhone || ""); }} className="flex-1 py-1.5 rounded-md bg-stone-100 text-xs font-medium text-stone-700">
                  {t.cancel}
                </button>
                <button onClick={save} disabled={saving} className="flex-1 py-1.5 rounded-md text-xs font-medium text-white disabled:opacity-50" style={{ background: BRAND_PURPLE }}>
                  {saving ? t.saving : t.save}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-sm mt-0.5">
                {currentPhone || <span className="italic text-stone-400">{t.noPhoneSet}</span>}
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5">{t.phoneUsedForReminders}</div>
              <button onClick={() => setEditing(true)} className="text-[11px] mt-1.5 px-2 py-0.5 rounded-md font-semibold" style={{ background: BRAND_PURPLE + "15", color: BRAND_PURPLE }}>
                {currentPhone ? <><Pencil size={10} className="inline mr-1" />{t.edit}</> : <><Plus size={10} className="inline mr-1" />{t.addPhone}</>}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- REMOVAL REQUESTS VIEW (Manager — approve/reject vendor removal requests) ----------
function RemovalRequestsView({ t, clients, vendors, interactions, onApprove, onReject, onBack }) {
  const requestedClients = (clients || [])
    .filter((c) => c.removalRequested && !c.archived)
    .sort((a, b) => (b.removalRequestedAt || 0) - (a.removalRequestedAt || 0));

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6 pb-24">
      <button onClick={onBack} className="flex items-center gap-1 text-stone-600 text-sm mb-6">
        <ArrowLeft size={16} /> {t.back}
      </button>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{prettyDate(t.locale)}</div>
        <h1 className="display text-3xl leading-tight flex items-center gap-2">
          <Trash2 size={22} /> {t.removalRequests}
        </h1>
        <p className="text-stone-500 text-sm mt-2">{t.removalRequestsSub}</p>
      </div>

      {requestedClients.length === 0 ? (
        <div className="text-center py-12 text-stone-400 text-sm italic">{t.noRemovalRequests}</div>
      ) : (
        <div className="space-y-2">
          {requestedClients.map((c) => {
            const vendor = vendors.find((v) => v.id === c.vendorId);
            const requester = vendors.find((v) => v.id === c.removalRequestedBy);
            const requestDate = c.removalRequestedAt ? new Date(c.removalRequestedAt).toLocaleString() : "";
            const interactionCount = (interactions || []).filter((i) => i.clientId === c.id).length;
            return (
              <div key={c.id} className="bg-white rounded-2xl p-3 card-shadow" style={{ borderLeft: "3px solid #9C5757" }}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{c.name}</div>
                    <div className="text-xs text-stone-500 mt-0.5 truncate">
                      {c.phone}{vendor ? ` · ${t.assignedTo || "Assigned to"}: ${vendor.name}` : ""}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-1 flex items-center gap-1.5">
                      <AlertCircle size={10} />
                      {t.requestedBy || "Requested by"}: <span className="font-medium">{requester?.name || t.unknownVendor}</span>
                      {requestDate && ` · ${requestDate}`}
                    </div>
                    {interactionCount > 0 && (
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {interactionCount} {interactionCount === 1 ? (t.interaction || "interaction") : (t.interactions || "interactions")} {t.onRecord || "on record"}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onReject(c.id)}
                    className="flex-1 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wide flex items-center justify-center gap-1"
                    style={{ background: "#F0EAE0", color: "#8B7355" }}
                  >
                    <X size={11} /> {t.reject || "Reject"}
                  </button>
                  <button
                    onClick={() => onApprove(c.id)}
                    className="flex-1 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wide flex items-center justify-center gap-1 text-white"
                    style={{ background: "#9C5757" }}
                  >
                    <Check size={11} /> {t.approveRemoval || "Approve & archive"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------- ARCHIVED CLIENTS VIEW (Manager — see and restore archived clients) ----------
function ArchivedClientsView({ t, clients, vendors, interactions, onUnarchive, onBack }) {
  const archivedClients = (clients || []).filter((c) => c.archived);

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6 pb-24">
      <button onClick={onBack} className="flex items-center gap-1 text-stone-600 text-sm mb-6">
        <ArrowLeft size={16} /> {t.back}
      </button>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{prettyDate(t.locale)}</div>
        <h1 className="display text-3xl leading-tight flex items-center gap-2">
          <Inbox size={22} /> {t.archivedClients}
        </h1>
        <p className="text-stone-500 text-sm mt-2">{t.archivedClientsSub}</p>
      </div>

      {archivedClients.length === 0 ? (
        <div className="text-center py-12 text-stone-400 text-sm italic">{t.noArchivedClients}</div>
      ) : (
        <div className="space-y-2">
          {archivedClients
            .sort((a, b) => (b.archivedAt || 0) - (a.archivedAt || 0))
            .map((c) => {
              const vendor = vendors.find((v) => v.id === c.vendorId);
              const notInterestedCount = (interactions || []).filter(
                (i) => i.clientId === c.id && i.channel === "call" && i.status === "not_interested"
              ).length;
              const archivedDate = c.archivedAt ? new Date(c.archivedAt).toLocaleDateString() : "";
              return (
                <div key={c.id} className="bg-white rounded-2xl p-3 card-shadow" style={{ borderLeft: "3px solid #8B7355" }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{c.name}</div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        {c.phone} {vendor ? `· ${vendor.name}` : ""}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-1 flex items-center gap-1.5">
                        <Inbox size={10} />
                        {c.archiveReason === "auto: 3 not interested"
                          ? `${t.archivedAuto} (${notInterestedCount} 'not interested')`
                          : t.archivedManually}
                        {archivedDate && ` · ${archivedDate}`}
                      </div>
                    </div>
                    <button
                      onClick={() => onUnarchive(c.id)}
                      className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide flex items-center gap-1 flex-shrink-0"
                      style={{ background: BRAND_PURPLE + "15", color: BRAND_PURPLE }}
                    >
                      <Check size={10} /> {t.restore}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

// ---------- APPROVALS VIEW (Manager — pending user accounts) ----------
function ApprovalsView({ t, pendingProfiles, onApprove, onReject, onBack }) {
  return (
    <div className="max-w-2xl mx-auto px-5 pt-6 pb-24">
      <button onClick={onBack} className="flex items-center gap-1 text-stone-600 text-sm mb-6">
        <ArrowLeft size={16} /> {t.back}
      </button>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{prettyDate(t.locale)}</div>
        <h1 className="display text-3xl leading-tight flex items-center gap-2">
          <UserPlus size={22} /> Pending users
        </h1>
        <p className="text-stone-500 text-sm mt-2">Approve or reject user signups.</p>
      </div>

      {pendingProfiles.length === 0 ? (
        <div className="text-center py-12 text-stone-400 text-sm italic">No pending users.</div>
      ) : (
        <div className="space-y-3">
          {pendingProfiles.map((p) => (
            <PendingUserCard key={p.id} profile={p} onApprove={onApprove} onReject={onReject} />
          ))}
        </div>
      )}
    </div>
  );
}

function PendingUserCard({ profile, onApprove, onReject }) {
  const [mode, setMode] = useState(null); // null | "reject"
  const [reason, setReason] = useState("");

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow" style={{ borderLeft: `3px solid ${BRAND_PURPLE}` }}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{profile.full_name}</div>
          <div className="text-xs text-stone-500 truncate font-mono mt-0.5">{profile.email}</div>
          {profile.phone && <div className="text-xs text-stone-500 mt-0.5">{profile.phone}</div>}
          <div className="text-[10px] text-stone-400 mt-1">
            Signed up {new Date(profile.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      {!mode && (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onApprove(profile.id)}
            className="rounded-xl py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all hover:scale-[1.02]"
            style={{ background: "#E8F0E9", color: "#2D5A3D" }}
          >
            <Check size={13} /> Approve
          </button>
          <button
            onClick={() => setMode("reject")}
            className="rounded-xl py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all hover:scale-[1.02]"
            style={{ background: "#F2E2E2", color: "#9C5757" }}
          >
            <X size={13} /> Reject
          </button>
        </div>
      )}

      {mode === "reject" && (
        <div className="rounded-xl p-3 space-y-2" style={{ background: "#F2E2E2", color: "#9C5757" }}>
          <div className="text-xs font-semibold uppercase tracking-wide">Reject account</div>
          <input
            type="text"
            autoFocus
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason (visible to user)"
            className="w-full bg-white/70 rounded-lg px-3 py-2 text-sm outline-none"
            style={{ color: "#1C1B1A" }}
          />
          <div className="flex gap-2 pt-1">
            <button onClick={() => setMode(null)} className="flex-1 py-2 rounded-lg bg-white/70 text-xs font-medium" style={{ color: "#1C1B1A" }}>
              Cancel
            </button>
            <button
              onClick={async () => { await onReject(profile.id, reason); setMode(null); }}
              className="flex-1 py-2 rounded-lg text-xs font-medium text-white"
              style={{ background: "#9C5757" }}
            >
              Confirm reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- LEADS VIEW (Manager) ----------
function LeadsView({ t, vendors, dataEntryUsers, leads, currentUser, onCreate, onApprove, onReject, onUpdate, onDelete, onBack }) {
  const [tab, setTab] = useState("pending");
  const [creating, setCreating] = useState(false);

  const pending = leads.filter((l) => l.status === "pending");
  const active = leads.filter((l) => l.status === "active");
  const rejected = leads.filter((l) => l.status === "rejected");

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6 pb-24">
      <button onClick={onBack} className="flex items-center gap-1 text-stone-600 text-sm mb-6">
        <ArrowLeft size={16} /> {t.back}
      </button>

      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{prettyDate(t.locale)}</div>
          <h1 className="display text-3xl leading-tight flex items-center gap-2">
            <ClipboardList size={22} /> {t.leadsKanban}
          </h1>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold text-white flex-shrink-0"
          style={{ background: BRAND_PURPLE }}
        >
          <Plus size={13} /> {t.newLead}
        </button>
      </div>

      {creating && (
        <CreateLeadForm t={t} onCreate={onCreate} onClose={() => setCreating(false)} />
      )}

      <div className="flex gap-1 mb-5 bg-white rounded-2xl p-1 card-shadow">
        <KanbanTab label={t.statusPending} count={pending.length} active={tab === "pending"} onClick={() => setTab("pending")} accent="#8B6F1A" />
        <KanbanTab label={t.statusActive} count={active.length} active={tab === "active"} onClick={() => setTab("active")} accent="#2D5A3D" />
        <KanbanTab label={t.statusRejected} count={rejected.length} active={tab === "rejected"} onClick={() => setTab("rejected")} accent="#9C5757" />
      </div>

      {tab === "pending" && (
        <PendingLeadsList
          t={t}
          leads={pending}
          vendors={vendors}
          dataEntryUsers={dataEntryUsers}
          currentUser={currentUser}
          onApprove={onApprove}
          onReject={onReject}
          onDelete={onDelete}
        />
      )}
      {tab === "active" && <ActiveLeadsList t={t} leads={active} vendors={vendors} dataEntryUsers={dataEntryUsers} currentUser={currentUser} onDelete={onDelete} />}
      {tab === "rejected" && <RejectedLeadsList t={t} leads={rejected} vendors={vendors} dataEntryUsers={dataEntryUsers} currentUser={currentUser} onDelete={onDelete} />}
    </div>
  );
}

function KanbanTab({ label, count, active, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 px-2 rounded-xl text-[11px] font-medium transition-all flex flex-col items-center justify-center gap-0.5 ${active ? "text-white" : "text-stone-600"}`}
      style={{ background: active ? accent : "transparent" }}
    >
      <span className="leading-none">{label}</span>
      <span className="text-[10px] opacity-80">{count}</span>
    </button>
  );
}

function CreateLeadForm({ t, onCreate, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    if (!name.trim()) { setError(t.nameRequired); return; }
    const result = await onCreate({ name, phone, note });
    if (result.success) {
      setName(""); setPhone(""); setNote(""); setError("");
      onClose();
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow mb-5 space-y-2" style={{ border: `1px solid ${BRAND_PURPLE}25` }}>
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-semibold" style={{ color: BRAND_PURPLE }}>{t.newLead}</div>
        <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1"><X size={14} /></button>
      </div>
      <input value={name} onChange={(e) => { setName(e.target.value); setError(""); }} placeholder={t.leadName} autoFocus className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phone} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.optionalNote} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
      {error && <div className="text-xs px-2 py-1 rounded-md" style={{ background: "#F2E2E2", color: "#9C5757" }}>{error}</div>}
      <button onClick={submit} className="w-full py-2 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-1" style={{ background: BRAND_PURPLE }}>
        <Plus size={14} /> {t.addLead}
      </button>
    </div>
  );
}

function creatorLabel(createdBy, vendors, dataEntryUsers, t, currentUser) {
  if (!createdBy) return t.roleManager;

  // Plain string "manager" (legacy format from before Fase 2)
  if (createdBy === "manager") return t.roleManager;

  // Format with role:uuid (post-Fase 2)
  if (createdBy.includes(":")) {
    const [role, id] = createdBy.split(":");
    if (role === "manager") {
      // Look up manager by id — could be the current user or another manager
      // The vendors array holds active vendors, but managers aren't there.
      // If currentUser matches, use their name. Otherwise show generic.
      if (currentUser && currentUser.id === id) {
        return `${currentUser.name || currentUser.email || t.roleManager} (${t.roleManager})`;
      }
      return t.roleManager;
    }
    if (role === "vendor") {
      const v = (vendors || []).find((x) => x.id === id);
      return v ? `${v.name} (${t.roleVendor})` : t.roleVendor;
    }
    if (role === "data_entry") {
      const u = (dataEntryUsers || []).find((x) => x.id === id);
      return u ? `${u.name} (${t.roleDataEntry})` : t.roleDataEntry;
    }
  }

  // Legacy formats without colons
  if (createdBy.startsWith("vendor:")) {
    const id = createdBy.split(":")[1];
    const v = (vendors || []).find((x) => x.id === id);
    return v ? `${v.name} (${t.roleVendor})` : t.roleVendor;
  }
  if (createdBy.startsWith("data_entry:")) {
    const id = createdBy.split(":")[1];
    const u = (dataEntryUsers || []).find((x) => x.id === id);
    return u ? `${u.name} (${t.roleDataEntry})` : t.roleDataEntry;
  }

  // Fallback: never show raw UUID
  return t.roleManager;
}

function PendingLeadsList({ t, leads, vendors, dataEntryUsers, currentUser, onApprove, onReject, onDelete }) {
  if (leads.length === 0) {
    return <div className="text-center py-12 text-stone-500 text-sm">{t.noPending}</div>;
  }
  return (
    <div className="space-y-3">
      {leads.map((lead) => (
        <PendingLeadCard key={lead.id} t={t} lead={lead} vendors={vendors} dataEntryUsers={dataEntryUsers} currentUser={currentUser} onApprove={onApprove} onReject={onReject} onDelete={onDelete} />
      ))}
    </div>
  );
}

function PendingLeadCard({ t, lead, vendors, dataEntryUsers, currentUser, onApprove, onReject, onDelete }) {
  const [mode, setMode] = useState(null); // null | "approve" | "reject"
  const [vendorId, setVendorId] = useState(vendors[0]?.id || "");
  const [reason, setReason] = useState("");
  const creator = creatorLabel(lead.createdBy, vendors, dataEntryUsers, t, currentUser);

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow" style={{ borderLeft: "3px solid #F5D785" }}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{lead.name}</div>
          <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5 flex-wrap">
            {lead.phone && <span className="flex items-center gap-1"><Phone size={10} /> {lead.phone}</span>}
            <span>·</span>
            <span>{t.requestedBy}: <strong>{creator}</strong></span>
          </div>
          {lead.note && (
            <div className="text-xs text-stone-600 mt-1.5 italic bg-stone-50 rounded px-2 py-1">"{lead.note}"</div>
          )}
        </div>
        <button onClick={() => onDelete(lead.id)} className="text-stone-300 hover:text-red-600 p-1 flex-shrink-0"><Trash2 size={12} /></button>
      </div>

      {!mode && (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode("approve")}
            className="rounded-xl py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all hover:scale-[1.02]"
            style={{ background: "#E8F0E9", color: "#2D5A3D" }}
          >
            <Check size={13} /> {t.approveAndAssign}
          </button>
          <button
            onClick={() => setMode("reject")}
            className="rounded-xl py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all hover:scale-[1.02]"
            style={{ background: "#F2E2E2", color: "#9C5757" }}
          >
            <X size={13} /> {t.reject}
          </button>
        </div>
      )}

      {mode === "approve" && (
        <div className="rounded-xl p-3 space-y-2" style={{ background: "#E8F0E9", color: "#2D5A3D" }}>
          <div className="text-xs font-semibold uppercase tracking-wide">{t.assignTo}</div>
          <select value={vendorId} onChange={(e) => setVendorId(e.target.value)} className="w-full bg-white/70 rounded-lg px-3 py-2 text-sm outline-none" style={{ color: "#1C1B1A" }}>
            {vendors.map((v) => (<option key={v.id} value={v.id}>{v.name}</option>))}
          </select>
          <div className="flex gap-2 pt-1">
            <button onClick={() => setMode(null)} className="flex-1 py-2 rounded-lg bg-white/70 text-xs font-medium" style={{ color: "#1C1B1A" }}>{t.cancel}</button>
            <button
              onClick={async () => { await onApprove(lead.id, vendorId); setMode(null); }}
              disabled={!vendorId}
              className="flex-1 py-2 rounded-lg text-xs font-medium text-white disabled:opacity-40"
              style={{ background: "#2D5A3D" }}
            >
              {t.approve}
            </button>
          </div>
        </div>
      )}

      {mode === "reject" && (
        <div className="rounded-xl p-3 space-y-2" style={{ background: "#F2E2E2", color: "#9C5757" }}>
          <div className="text-xs font-semibold uppercase tracking-wide">{t.rejectLead}</div>
          <input
            type="text"
            autoFocus
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t.rejectReason}
            className="w-full bg-white/70 rounded-lg px-3 py-2 text-sm outline-none"
            style={{ color: "#1C1B1A" }}
          />
          <div className="flex gap-2 pt-1">
            <button onClick={() => setMode(null)} className="flex-1 py-2 rounded-lg bg-white/70 text-xs font-medium" style={{ color: "#1C1B1A" }}>{t.cancel}</button>
            <button
              onClick={async () => { await onReject(lead.id, reason); setMode(null); }}
              disabled={!reason.trim()}
              className="flex-1 py-2 rounded-lg text-xs font-medium text-white disabled:opacity-40"
              style={{ background: "#9C5757" }}
            >
              {t.confirmReject}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveLeadsList({ t, leads, vendors, dataEntryUsers, currentUser, onDelete }) {
  if (leads.length === 0) {
    return <div className="text-center py-12 text-stone-500 text-sm">{t.noActiveLeads}</div>;
  }
  return (
    <div className="space-y-3">
      {leads.map((lead) => {
        const vendor = vendors.find((v) => v.id === lead.assignedVendorId);
        const creator = creatorLabel(lead.createdBy, vendors, dataEntryUsers, t, currentUser);
        return (
          <div key={lead.id} className="bg-white rounded-2xl p-4 card-shadow" style={{ borderLeft: "3px solid #2D5A3D" }}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{lead.name}</div>
                <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5 flex-wrap">
                  {lead.phone && <span className="flex items-center gap-1"><Phone size={10} /> {lead.phone}</span>}
                  <span>·</span>
                  <span>{t.assignTo}: <strong style={{ color: "#2D5A3D" }}>{vendor?.name || "—"}</strong></span>
                </div>
                <div className="text-[11px] text-stone-400 mt-1">{t.createdBy}: {creator}</div>
              </div>
              <button onClick={() => onDelete(lead.id)} className="text-stone-300 hover:text-red-600 p-1 flex-shrink-0"><Trash2 size={12} /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RejectedLeadsList({ t, leads, vendors, dataEntryUsers, currentUser, onDelete }) {
  if (leads.length === 0) {
    return <div className="text-center py-12 text-stone-500 text-sm">{t.noRejected}</div>;
  }
  return (
    <div className="space-y-3">
      {leads.map((lead) => {
        const creator = creatorLabel(lead.createdBy, vendors, dataEntryUsers, t, currentUser);
        return (
          <div key={lead.id} className="bg-white rounded-2xl p-4 card-shadow" style={{ borderLeft: "3px solid #9C5757" }}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{lead.name}</div>
                <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5 flex-wrap">
                  {lead.phone && <span className="flex items-center gap-1"><Phone size={10} /> {lead.phone}</span>}
                  <span>· {t.createdBy}: {creator}</span>
                </div>
                {lead.rejectionNote && (
                  <div className="text-xs mt-2 px-2 py-1 rounded" style={{ background: "#F2E2E2", color: "#9C5757" }}>
                    {t.rejectionNotice} <span className="italic">"{lead.rejectionNote}"</span>
                  </div>
                )}
              </div>
              <button onClick={() => onDelete(lead.id)} className="text-stone-300 hover:text-red-600 p-1 flex-shrink-0"><Trash2 size={12} /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- DATA ENTRY VIEW ----------
function DataEntryView({ t, currentUser, vendors, leads, onCreate, onUpdateLead }) {
  const [creating, setCreating] = useState(false);

  // show all leads created by this user OR all pending (visibility helps them)
  const visibleLeads = leads.slice().sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6 pb-24">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{prettyDate(t.locale)}</div>
        <h1 className="display text-3xl leading-tight">{currentUser.name}</h1>
        <p className="text-stone-500 text-sm mt-1">{t.dataEntryHomeSub}</p>
      </div>

      <button
        onClick={() => setCreating(true)}
        className="w-full mb-5 rounded-2xl p-4 flex items-center justify-center gap-2 text-white card-shadow font-semibold"
        style={{ background: BRAND_PURPLE }}
      >
        <Plus size={16} /> {t.newLead}
      </button>

      {creating && (
        <CreateLeadForm t={t} onCreate={onCreate} onClose={() => setCreating(false)} />
      )}

      <div className="text-xs uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-1.5">
        <Database size={11} /> {t.leads} ({visibleLeads.length})
      </div>

      {visibleLeads.length === 0 ? (
        <div className="text-center py-12 text-stone-500 text-sm">{t.noLeads}</div>
      ) : (
        <div className="space-y-2">
          {visibleLeads.map((lead) => {
            const statusColor = {
              pending: { bg: "#FFF5D6", border: "#F5D785", color: "#8B6F1A", label: t.statusPending },
              active: { bg: "#E8F0E9", border: "#2D5A3D", color: "#2D5A3D", label: t.statusActive },
              rejected: { bg: "#F2E2E2", border: "#9C5757", color: "#9C5757", label: t.statusRejected },
              converted: { bg: "#E5EAF2", border: "#5A6B85", color: "#5A6B85", label: t.statusConverted },
            }[lead.status];
            const vendor = lead.assignedVendorId ? vendors.find((v) => v.id === lead.assignedVendorId) : null;

            return (
              <div key={lead.id} className="bg-white rounded-2xl p-3 card-shadow" style={{ borderLeft: `3px solid ${statusColor.border}` }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{lead.name}</div>
                    <div className="text-xs text-stone-500 truncate">{lead.phone || "—"}</div>
                    {vendor && <div className="text-[11px] text-stone-500 mt-0.5">→ {vendor.name}</div>}
                    {lead.status === "rejected" && lead.rejectionNote && (
                      <div className="text-[11px] mt-1 italic" style={{ color: "#9C5757" }}>"{lead.rejectionNote}"</div>
                    )}
                  </div>
                  <div className="px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0" style={{ background: statusColor.bg, color: statusColor.color }}>
                    {statusColor.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------- HOME ----------
function Home({ t, onPick, vendors }) {
  return (
    <div className="max-w-md mx-auto px-5 pt-12 pb-24">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">{prettyDate(t.locale)}</div>
        <h1 className="display text-5xl leading-none mb-2">{t.appTitle}</h1>
        <p className="text-stone-600 text-sm">{t.pickRole}</p>
      </div>
      <div className="space-y-3 mb-8">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-3">{t.salespeople}</div>
        {vendors.map((v) => (
          <button key={v.id} onClick={() => onPick("vendor", v.id)} className="w-full text-left bg-white rounded-2xl p-4 card-shadow flex items-center justify-between transition-all hover:translate-x-1">
            <div>
              <div className="font-medium text-base">{v.name}</div>
              <div className="text-xs text-stone-500">{v.phone}</div>
            </div>
            <ChevronRight size={18} className="text-stone-400" />
          </button>
        ))}
      </div>
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-3">{t.admin}</div>
        <button onClick={() => onPick("admin")} className="w-full text-left rounded-2xl p-4 flex items-center justify-between card-shadow" style={{ background: "linear-gradient(135deg, #5F2F9D 0%, #844ECA 100%)", color: "#F5F1EA" }}>
          <div className="flex items-center gap-3">
            <Crown size={20} />
            <div>
              <div className="font-medium">{t.managerDashboard}</div>
              <div className="text-xs opacity-70">{t.reportsSupervision}</div>
            </div>
          </div>
          <ChevronRight size={18} className="opacity-70" />
        </button>
        <button onClick={() => onPick("setup")} className="w-full text-left bg-white rounded-2xl p-4 flex items-center justify-between card-shadow">
          <div className="flex items-center gap-3">
            <Settings size={20} className="text-stone-600" />
            <div>
              <div className="font-medium">{t.settings}</div>
              <div className="text-xs text-stone-500">{t.repsClients}</div>
            </div>
          </div>
          <ChevronRight size={18} className="text-stone-400" />
        </button>
      </div>
    </div>
  );
}

// ---------- VENDOR VIEW ----------
// ============================================
// MANAGER INSIGHTS VIEW (Manager — team-wide and per-vendor pattern report)
// ============================================
//
// Wraps SalesInsightsView with:
//   - Loads ALL historical interactions (manager has RLS access to all)
//   - Adds a vendor selector pill row at the top: "All vendors" or pick a specific one
//   - Passes vendorId=null when "All vendors" is selected (SalesInsightsView handles this)
function ManagerInsightsView({ t, vendors, clients, interactions, onBack }) {
  const [selectedVendorId, setSelectedVendorId] = useState(null); // null = team-wide
  const [allInts, setAllInts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadAllInteractions().then((historical) => {
      if (cancelled) return;
      // Combine with realtime (today's) interactions; dedupe by id
      const byId = new Map();
      historical.forEach((i) => byId.set(i.id, i));
      (interactions || []).forEach((i) => byId.set(i.id, i));
      setAllInts(Array.from(byId.values()));
    });
    return () => { cancelled = true; };
  }, []);

  // While loading, show a basic skeleton
  if (allInts === null) {
    return (
      <div className="max-w-2xl mx-auto px-5 pt-6 pb-24">
        <button onClick={onBack} className="flex items-center gap-1 text-stone-600 text-sm mb-6">
          <ArrowLeft size={16} /> {t.back}
        </button>
        <div className="text-center py-12 text-stone-400 text-sm">{t.loading || "Loading…"}</div>
      </div>
    );
  }

  // For the per-vendor mode: filter interactions to that vendor only
  const filteredInts = selectedVendorId === null
    ? allInts
    : allInts.filter((i) => i.vendorId === selectedVendorId);

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);

  return (
    <div>
      {/* Vendor selector pill row — manager-only feature */}
      <div className="max-w-2xl mx-auto px-5 pt-4">
        <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">
          {t.viewingFor || "Viewing for"}
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 -mx-1 px-1">
          {/* All vendors pill */}
          <button
            onClick={() => setSelectedVendorId(null)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap"
            style={{
              background: selectedVendorId === null ? BRAND_PURPLE : "white",
              color: selectedVendorId === null ? "white" : "#3D3733",
              border: `1px solid ${selectedVendorId === null ? BRAND_PURPLE : "rgba(0,0,0,0.08)"}`,
            }}
          >
            {t.allVendors || "All vendors"}
          </button>
          {/* One pill per vendor */}
          {vendors.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVendorId(v.id)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap"
              style={{
                background: selectedVendorId === v.id ? BRAND_PURPLE : "white",
                color: selectedVendorId === v.id ? "white" : "#3D3733",
                border: `1px solid ${selectedVendorId === v.id ? BRAND_PURPLE : "rgba(0,0,0,0.08)"}`,
              }}
            >
              {v.name}
            </button>
          ))}
        </div>
        {selectedVendor && (
          <div className="text-[11px] text-stone-500 mb-1">
            {t.showingDataFor || "Showing data for"} <strong style={{ color: BRAND_PURPLE }}>{selectedVendor.name}</strong>
          </div>
        )}
      </div>

      {/* Reuse SalesInsightsView with filtered data */}
      <SalesInsightsView
        t={t}
        key={selectedVendorId || "all"}
        vendorId={selectedVendorId}
        clients={clients}
        vendorInteractions={filteredInts}
        onBack={onBack}
      />
    </div>
  );
}


// ============================================
// SALES INSIGHTS VIEW (analyze ordering patterns by day)
// ============================================
//
// This view helps users identify which customers tend to order on specific days.
// Backed by the full historical interaction data (loaded from Supabase on mount).
// When vendorId is null, shows team-wide patterns (used by ManagerInsightsView).
// Data is grouped 3 ways:
//   1. By day of week — "These customers usually order on Mondays"
//   2. By customer pattern — "Customer X orders every 7 days like clockwork"
//   3. By weekday trend — "Mondays are your strongest day"
function SalesInsightsView({ t, vendorId, clients, vendorInteractions, onBack }) {
  // Tab: "byDay" (default), "byCustomer", "trends"
  const [tab, setTab] = useState("byDay");

  // For "byDay" tab: which day of week to inspect (0=Sun, 1=Mon, ..., 6=Sat)
  const todayDow = new Date().getDay();
  const [selectedDow, setSelectedDow] = useState(todayDow);

  // Filter to only "ordered" status interactions for this vendor's customers
  // If vendorId is null (manager team-wide view), include all non-archived clients
  const myClients = useMemo(() => clients.filter((c) =>
    !c.archived && (vendorId === null || c.vendorId === vendorId)
  ), [clients, vendorId]);
  const myClientIds = useMemo(() => new Set(myClients.map((c) => c.id)), [myClients]);

  const orderedInts = useMemo(() => {
    return (vendorInteractions || [])
      .filter((i) => i.status === "ordered" && i.channel === "call" && myClientIds.has(i.clientId))
      .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  }, [vendorInteractions, myClientIds]);

  // Today's date as YYYY-MM-DD string
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const isShowingToday = selectedDow === todayDow;

  // For each customer, analyze their ordering pattern across full history
  // Returns map: clientId -> { ordersByDow: { 0..6: count }, lastOrderDate, totalOrders, daysSinceLastOrder }
  // Uses FULL order history (no time filter) so patterns reflect all available data
  const customerPatterns = useMemo(() => {
    const map = new Map();

    orderedInts.forEach((i) => {
      const d = new Date(i.timestamp);
      const dow = d.getDay();
      const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

      if (!map.has(i.clientId)) {
        map.set(i.clientId, {
          clientId: i.clientId,
          ordersByDow: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
          orderDates: new Set(),
          lastOrderTimestamp: 0,
          totalOrders: 0,
        });
      }
      const p = map.get(i.clientId);
      // Count unique order dates per dow (avoid double-counting if multiple orders same day)
      if (!p.orderDates.has(dateKey)) {
        p.ordersByDow[dow] += 1;
        p.orderDates.add(dateKey);
        p.totalOrders += 1;
      }
      if ((i.timestamp || 0) > p.lastOrderTimestamp) {
        p.lastOrderTimestamp = i.timestamp;
      }
    });

    // Compute days since last order
    map.forEach((p) => {
      p.daysSinceLastOrder = p.lastOrderTimestamp
        ? Math.floor((today.getTime() - p.lastOrderTimestamp) / (24 * 60 * 60 * 1000))
        : null;
    });

    return map;
  }, [orderedInts]);

  // For the "by day" tab: classify clients into buckets based on selected dow
  const byDayBuckets = useMemo(() => {
    // Did they order TODAY (only relevant if selected day = today)?
    const orderedTodayIds = new Set(
      orderedInts
        .filter((i) => {
          const d = new Date(i.timestamp);
          const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
          return k === todayKey;
        })
        .map((i) => i.clientId)
    );

    const recurringStrong = []; // 3+ of last 4 instances of selectedDow
    const recurringMild = [];   // 2 of last 4 instances of selectedDow
    const ordered = [];         // Already ordered today (only if showing today)
    const atRisk = [];          // Used to order this dow but skipped recently
    const newPattern = [];      // 2 orders on selectedDow recently — emerging pattern

    myClients.forEach((c) => {
      const pattern = customerPatterns.get(c.id);
      if (!pattern) return; // No order history

      const dowCount = pattern.ordersByDow[selectedDow] || 0;
      const isOrderedToday = orderedTodayIds.has(c.id);

      // Find the most recent occurrence of selectedDow before today
      // and check if they ordered then
      const lastSelectedDowDate = (() => {
        let d = new Date(today);
        // Step back to most recent past selectedDow (excluding today)
        const diff = (d.getDay() - selectedDow + 7) % 7;
        if (diff === 0) {
          // Selected dow is today — go back 7 days for "last week"
          d = new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000);
        } else {
          d = new Date(d.getTime() - diff * 24 * 60 * 60 * 1000);
        }
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      })();

      const orderedLastSelectedDow = pattern.orderDates.has(lastSelectedDowDate);

      if (isShowingToday && isOrderedToday) {
        ordered.push({ client: c, pattern, orderedLastWeek: orderedLastSelectedDow });
        return;
      }

      if (dowCount >= 3) {
        recurringStrong.push({ client: c, pattern, orderedLastWeek: orderedLastSelectedDow });
      } else if (dowCount === 2) {
        recurringMild.push({ client: c, pattern, orderedLastWeek: orderedLastSelectedDow });
      } else if (dowCount === 1 && pattern.totalOrders >= 2) {
        // Was ordering on this dow but slipped — at risk
        if (!orderedLastSelectedDow) {
          atRisk.push({ client: c, pattern, orderedLastWeek: false });
        }
      }
    });

    // Sort by recency / relevance
    recurringStrong.sort((a, b) => (b.pattern.lastOrderTimestamp || 0) - (a.pattern.lastOrderTimestamp || 0));
    recurringMild.sort((a, b) => (b.pattern.lastOrderTimestamp || 0) - (a.pattern.lastOrderTimestamp || 0));
    atRisk.sort((a, b) => (a.pattern.daysSinceLastOrder || 0) - (b.pattern.daysSinceLastOrder || 0));

    return { recurringStrong, recurringMild, ordered, atRisk, newPattern, totalRecurring: recurringStrong.length + recurringMild.length };
  }, [myClients, customerPatterns, selectedDow, todayKey, isShowingToday, orderedInts]);

  // For the "by customer" tab: list all clients with their patterns
  const byCustomerList = useMemo(() => {
    return myClients
      .map((c) => {
        const pattern = customerPatterns.get(c.id);
        if (!pattern) return { client: c, pattern: null, dominantDow: null };
        // Find the DOW with most orders
        let max = 0;
        let dominantDow = null;
        for (let dow = 0; dow < 7; dow++) {
          if (pattern.ordersByDow[dow] > max) {
            max = pattern.ordersByDow[dow];
            dominantDow = dow;
          }
        }
        // Calculate average days between orders
        const sortedDates = Array.from(pattern.orderDates).sort();
        let avgDays = null;
        if (sortedDates.length >= 2) {
          const intervals = [];
          for (let i = 1; i < sortedDates.length; i++) {
            const d1 = new Date(sortedDates[i - 1]);
            const d2 = new Date(sortedDates[i]);
            intervals.push(Math.round((d2 - d1) / (24 * 60 * 60 * 1000)));
          }
          avgDays = Math.round(intervals.reduce((s, v) => s + v, 0) / intervals.length);
        }
        return { client: c, pattern, dominantDow, avgDaysBetweenOrders: avgDays };
      })
      .sort((a, b) => (b.pattern?.totalOrders || 0) - (a.pattern?.totalOrders || 0));
  }, [myClients, customerPatterns]);

  // For the "trends" tab: total orders per day of week (last 4 weeks)
  const trendsByDow = useMemo(() => {
    const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    customerPatterns.forEach((p) => {
      for (let dow = 0; dow < 7; dow++) counts[dow] += p.ordersByDow[dow];
    });
    const max = Math.max(...Object.values(counts), 1);
    return { counts, max };
  }, [customerPatterns]);

  const dowLabels = t.locale === "es"
    ? ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dowLabelsLong = t.locale === "es"
    ? ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const totalDataPoints = orderedInts.length;
  const hasEnoughData = totalDataPoints >= 5;

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6 pb-24">
      <button onClick={onBack} className="flex items-center gap-1 text-stone-600 text-sm mb-6">
        <ArrowLeft size={16} /> {t.back}
      </button>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{prettyDate(t.locale)}</div>
        <h1 className="display text-3xl leading-tight flex items-center gap-2">
          <BarChart3 size={22} /> {t.salesInsights || "Sales Insights"}
        </h1>
        <p className="text-stone-500 text-sm mt-2">{t.salesInsightsSub || "Track your customer ordering patterns over the last 4 weeks"}</p>
      </div>

      {!hasEnoughData && (
        <div className="bg-stone-100 rounded-2xl p-4 mb-6 text-center">
          <Info size={20} className="mx-auto mb-2 text-stone-400" />
          <div className="text-sm font-medium text-stone-700">{t.notEnoughData || "Not enough data yet"}</div>
          <div className="text-xs text-stone-500 mt-1">
            {t.notEnoughDataSub || "Patterns appear after a few weeks of consistent use. Keep logging orders!"}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-stone-100 rounded-xl p-1 flex gap-1 mb-6">
        <InsightTab label={t.byDay || "By day"} icon={Calendar} active={tab === "byDay"} onClick={() => setTab("byDay")} />
        <InsightTab label={t.byCustomer || "By customer"} icon={Users} active={tab === "byCustomer"} onClick={() => setTab("byCustomer")} />
        <InsightTab label={t.trends || "Trends"} icon={TrendingUp} active={tab === "trends"} onClick={() => setTab("trends")} />
      </div>

      {/* Tab content */}
      {tab === "byDay" && (
        <ByDayTab
          t={t}
          dowLabels={dowLabels}
          dowLabelsLong={dowLabelsLong}
          selectedDow={selectedDow}
          setSelectedDow={setSelectedDow}
          todayDow={todayDow}
          isShowingToday={isShowingToday}
          buckets={byDayBuckets}
        />
      )}

      {tab === "byCustomer" && (
        <ByCustomerTab t={t} dowLabelsLong={dowLabelsLong} list={byCustomerList} />
      )}

      {tab === "trends" && (
        <TrendsTab t={t} dowLabels={dowLabels} dowLabelsLong={dowLabelsLong} trends={trendsByDow} totalOrders={Object.values(trendsByDow.counts).reduce((s, v) => s + v, 0)} />
      )}
    </div>
  );
}

function InsightTab({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all"
      style={{
        background: active ? "white" : "transparent",
        color: active ? BRAND_PURPLE : "#8B7355",
        boxShadow: active ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <Icon size={11} /> {label}
    </button>
  );
}

// ===== BY DAY TAB =====
function ByDayTab({ t, dowLabels, dowLabelsLong, selectedDow, setSelectedDow, todayDow, isShowingToday, buckets }) {
  const totalRecurring = buckets.totalRecurring;
  const orderedCount = buckets.ordered.length;

  return (
    <div>
      {/* Day picker */}
      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">{t.selectDay || "Select day"}</div>
        <div className="grid grid-cols-7 gap-1.5">
          {dowLabels.map((label, dow) => {
            const isSelected = dow === selectedDow;
            const isToday = dow === todayDow;
            return (
              <button
                key={dow}
                onClick={() => setSelectedDow(dow)}
                className="rounded-lg py-2 text-xs font-semibold transition-all flex flex-col items-center justify-center"
                style={{
                  background: isSelected ? BRAND_PURPLE : "white",
                  color: isSelected ? "white" : (isToday ? BRAND_PURPLE : "#3D3733"),
                  border: isToday && !isSelected ? `1.5px solid ${BRAND_PURPLE}` : "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <span>{label}</span>
                {isToday && <span className="text-[8px] opacity-70 mt-0.5">{t.today}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary card */}
      <div className="bg-white rounded-2xl p-4 card-shadow mb-5">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">
          {t.patternFor || "Pattern for"} {dowLabelsLong[selectedDow]}
        </div>
        <div className="display text-2xl mb-2">
          {totalRecurring > 0
            ? `${totalRecurring} ${totalRecurring === 1 ? (t.recurringClient || "recurring client") : (t.recurringClients || "recurring clients")}`
            : (t.noRecurringPatterns || "No patterns yet")}
        </div>
        {isShowingToday && totalRecurring > 0 && (
          <>
            <div className="text-xs text-stone-500 mb-2">
              {t.todayProgress || "Today's progress"}: {orderedCount}/{totalRecurring} ({Math.round((orderedCount / totalRecurring) * 100)}%)
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full transition-all"
                style={{ width: `${(orderedCount / totalRecurring) * 100}%`, background: "#73A626" }}
              />
            </div>
          </>
        )}
      </div>

      {/* Buckets */}
      {buckets.ordered.length > 0 && (
        <InsightSection
          t={t}
          title={t.orderedToday || "Ordered today"}
          icon={CheckCircle2}
          color="#73A626"
          bg="#E8F2D5"
          lightBg="#F4F9E8"
          items={buckets.ordered}
          renderItem={(item) => <CustomerInsightCard t={t} item={item} status="ordered" />}
        />
      )}

      {buckets.recurringStrong.length > 0 && (
        <InsightSection
          t={t}
          title={t.stronglyRecurring || "Strong pattern (3+ of 4)"}
          icon={Zap}
          color="#5F2F9D"
          bg="#E8DCF5"
          lightBg="#F4EDFA"
          items={buckets.recurringStrong}
          renderItem={(item) => <CustomerInsightCard t={t} item={item} status={isShowingToday ? "pending" : "info"} />}
        />
      )}

      {buckets.recurringMild.length > 0 && (
        <InsightSection
          t={t}
          title={t.mildlyRecurring || "Mild pattern (2 of 4)"}
          icon={Clock}
          color="#5A6B85"
          bg="#E5EAF2"
          lightBg="#F2F5F9"
          items={buckets.recurringMild}
          renderItem={(item) => <CustomerInsightCard t={t} item={item} status={isShowingToday ? "pending" : "info"} />}
        />
      )}

      {buckets.atRisk.length > 0 && (
        <InsightSection
          t={t}
          title={t.atRisk || "At risk — used to order this day"}
          icon={AlertCircle}
          color="#9C5757"
          bg="#F2E2E2"
          lightBg="#F9EFEF"
          items={buckets.atRisk}
          renderItem={(item) => <CustomerInsightCard t={t} item={item} status="atRisk" />}
        />
      )}

      {buckets.totalRecurring === 0 && buckets.atRisk.length === 0 && buckets.ordered.length === 0 && (
        <div className="text-center py-12 text-stone-400 text-sm italic">
          {t.noPatternsForDay || "No customers with ordering patterns for this day yet"}
        </div>
      )}
    </div>
  );
}

// Reusable section header + collapsible list
function InsightSection({ t, title, icon: Icon, color, bg, lightBg, items, renderItem }) {
  const [expanded, setExpanded] = useState(true);
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-5 rounded-2xl overflow-hidden" style={{ background: lightBg, border: `1px solid ${bg}` }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-2.5"
        style={{ background: bg }}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.6)" }}>
            <Icon size={14} style={{ color }} />
          </div>
          <div className="font-bold text-sm uppercase tracking-wide truncate text-left" style={{ color }}>
            {title}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: color }}>
            {items.length}
          </div>
          <ChevronRight size={16} style={{ color, transform: expanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
        </div>
      </button>
      {expanded && (
        <div className="p-3 space-y-2.5">
          {items.map((item, idx) => <div key={item.client?.id || idx}>{renderItem(item)}</div>)}
        </div>
      )}
    </div>
  );
}

// Card for a single customer in the insights list — expands to show pattern history
function CustomerInsightCard({ t, item, status }) {
  const [expanded, setExpanded] = useState(false);
  const { client, pattern, orderedLastWeek } = item;
  if (!client) return null;

  const totalOrders = pattern?.totalOrders || 0;
  const lastOrderDays = pattern?.daysSinceLastOrder;
  const lastOrderLabel = lastOrderDays === null ? "—"
    : lastOrderDays === 0 ? (t.today || "today")
    : lastOrderDays === 1 ? (t.yesterday || "yesterday")
    : `${lastOrderDays} ${t.daysAgo || "days ago"}`;

  return (
    <div className="bg-white rounded-lg overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-3 py-2.5 flex items-center justify-between gap-2"
      >
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{client.name}</div>
          <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
            <Phone size={9} /> {client.phone}
            <span className="text-stone-300">·</span>
            <span>{t.lastOrder || "Last order"}: {lastOrderLabel}</span>
            {orderedLastWeek && status !== "ordered" && (
              <>
                <span className="text-stone-300">·</span>
                <span style={{ color: "#73A626" }}>✓ {t.orderedLastTime || "ordered last time"}</span>
              </>
            )}
          </div>
        </div>
        <ChevronRight size={14} className="text-stone-400 flex-shrink-0" style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
      </button>
      {expanded && pattern && (
        <div className="px-3 pb-3 pt-1" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2 mt-1">{t.last4Weeks || "Last 4 weeks"}</div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {[0, 1, 2, 3, 4, 5, 6].map((dow) => {
              const count = pattern.ordersByDow[dow];
              const labels = ["S", "M", "T", "W", "T", "F", "S"];
              return (
                <div key={dow} className="text-center">
                  <div className="text-[9px] text-stone-400 mb-0.5">{labels[dow]}</div>
                  <div
                    className="rounded text-xs font-bold py-1"
                    style={{
                      background: count > 0 ? `rgba(95,47,157,${0.2 + (count / 4) * 0.6})` : "#F0EAE0",
                      color: count > 0 ? "#fff" : "#A89B8E",
                    }}
                  >
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-[11px] text-stone-500">
            {totalOrders} {totalOrders === 1 ? (t.totalOrder || "total order") : (t.totalOrders || "total orders")} {t.inLast4Weeks || "in last 4 weeks"}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== BY CUSTOMER TAB =====
function ByCustomerTab({ t, dowLabelsLong, list }) {
  const withPatterns = list.filter((x) => x.pattern && x.pattern.totalOrders > 0);
  const noOrders = list.filter((x) => !x.pattern || x.pattern.totalOrders === 0);

  return (
    <div>
      <div className="bg-white rounded-2xl p-4 card-shadow mb-4">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{t.summary || "Summary"}</div>
        <div className="display text-2xl mb-1">
          {withPatterns.length} / {list.length} {t.withOrderHistory || "with order history"}
        </div>
        <div className="text-xs text-stone-500">{t.last4Weeks || "Last 4 weeks"}</div>
      </div>

      {withPatterns.length > 0 && (
        <div className="space-y-2 mb-4">
          {withPatterns.map((item) => (
            <ByCustomerRow key={item.client.id} t={t} item={item} dowLabelsLong={dowLabelsLong} />
          ))}
        </div>
      )}

      {noOrders.length > 0 && (
        <div className="mt-6">
          <div className="text-xs uppercase tracking-widest text-stone-400 mb-2">
            {t.noRecentOrders || "No recent orders"} ({noOrders.length})
          </div>
          <div className="space-y-1">
            {noOrders.slice(0, 10).map((item) => (
              <div key={item.client.id} className="text-xs text-stone-500 flex items-center gap-2 py-1">
                <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                {item.client.name}
              </div>
            ))}
            {noOrders.length > 10 && (
              <div className="text-[11px] text-stone-400 italic mt-1">{t.andMore || "and"} {noOrders.length - 10} {t.more || "more"}…</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ByCustomerRow({ t, item, dowLabelsLong }) {
  const [expanded, setExpanded] = useState(false);
  const { client, pattern, dominantDow, avgDaysBetweenOrders } = item;

  return (
    <div className="bg-white rounded-lg overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left px-3 py-2.5 flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{client.name}</div>
          <div className="text-[11px] text-stone-500 mt-0.5">
            {pattern.totalOrders} {pattern.totalOrders === 1 ? (t.order || "order") : (t.orders || "orders")}
            {dominantDow !== null && (
              <span> · {t.mostly || "mostly"} <strong>{dowLabelsLong[dominantDow]}</strong></span>
            )}
            {avgDaysBetweenOrders && (
              <span> · {t.every || "every"} ~{avgDaysBetweenOrders} {t.days || "days"}</span>
            )}
          </div>
        </div>
        <ChevronRight size={14} className="text-stone-400 flex-shrink-0" style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
      </button>
      {expanded && (
        <div className="px-3 pb-3 pt-1" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2 mt-1">{t.dayOfWeekDistribution || "By day of week"}</div>
          <div className="grid grid-cols-7 gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map((dow) => {
              const count = pattern.ordersByDow[dow];
              const labels = ["S", "M", "T", "W", "T", "F", "S"];
              const isDominant = dow === dominantDow;
              return (
                <div key={dow} className="text-center">
                  <div className="text-[9px] mb-0.5" style={{ color: isDominant ? BRAND_PURPLE : "#A89B8E", fontWeight: isDominant ? 700 : 400 }}>{labels[dow]}</div>
                  <div className="rounded text-xs font-bold py-1" style={{
                    background: count > 0 ? `rgba(95,47,157,${0.2 + (count / 4) * 0.6})` : "#F0EAE0",
                    color: count > 0 ? "#fff" : "#A89B8E",
                  }}>
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== TRENDS TAB =====
function TrendsTab({ t, dowLabels, dowLabelsLong, trends, totalOrders }) {
  const { counts, max } = trends;
  const sortedByCount = [0, 1, 2, 3, 4, 5, 6].sort((a, b) => counts[b] - counts[a]);
  const bestDow = sortedByCount[0];
  const worstDow = sortedByCount[6];

  return (
    <div>
      <div className="bg-white rounded-2xl p-4 card-shadow mb-5">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{t.totalOrders || "Total orders"}</div>
        <div className="display text-3xl mb-1">{totalOrders}</div>
        <div className="text-xs text-stone-500">{t.last4Weeks || "Last 4 weeks"}</div>
      </div>

      {totalOrders > 0 && (
        <>
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-3">
            {t.ordersByDay || "Orders by day of week"}
          </div>
          <div className="bg-white rounded-2xl p-4 card-shadow mb-5">
            {[0, 1, 2, 3, 4, 5, 6].map((dow) => {
              const count = counts[dow];
              const pct = max > 0 ? (count / max) * 100 : 0;
              return (
                <div key={dow} className="flex items-center gap-3 mb-2 last:mb-0">
                  <div className="text-xs font-medium w-10 flex-shrink-0" style={{ color: dow === bestDow ? "#73A626" : "#3D3733" }}>
                    {dowLabels[dow]}
                  </div>
                  <div className="flex-1 h-6 bg-stone-100 rounded relative overflow-hidden">
                    <div
                      className="h-full rounded transition-all"
                      style={{
                        width: `${pct}%`,
                        background: dow === bestDow ? "#73A626" : (dow === worstDow && count > 0 ? "#9C5757" : BRAND_PURPLE),
                      }}
                    />
                  </div>
                  <div className="text-xs font-semibold w-8 text-right flex-shrink-0">{count}</div>
                </div>
              );
            })}
          </div>

          {counts[bestDow] > 0 && (
            <div className="bg-white rounded-2xl p-4 card-shadow mb-3" style={{ borderLeft: "3px solid #73A626" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#73A626" }}>
                💪 {t.strongestDay || "Strongest day"}
              </div>
              <div className="text-sm font-semibold">
                {dowLabelsLong[bestDow]} · {counts[bestDow]} {counts[bestDow] === 1 ? (t.order || "order") : (t.orders || "orders")}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                {Math.round((counts[bestDow] / totalOrders) * 100)}% {t.ofYourOrders || "of your orders"}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


// ---------- VENDOR VIEW (main vendor home screen) ----------
function VendorView({ t, vendorId, vendors, clients, leads, interactions, templates, tasks, quotas, tags, myPhone, onUpdatePhone, onLog, onUndo, onUpdate, onCloseCallback, onRequestLead, onCreateTask, onUpdateTask, onDeleteTask, onUpdateClient, onRequestRemoval, onCancelRemovalRequest, onBack }) {
  const [view, setView] = useState("home"); // "home" | "insights"
  const vendor = vendors.find((v) => v.id === vendorId);
  const myClients = clients.filter((c) => c.vendorId === vendorId && !c.archived);
  const myLeads = (leads || []).filter((l) => l.assignedVendorId === vendorId && l.status === "active");
  const myRecentRejected = (leads || []).filter((l) => {
    if (l.status !== "rejected") return false;
    if (!l.createdBy?.startsWith(`vendor:${vendorId}`)) return false;
    // Show rejections from the last 7 days
    return Date.now() - (l.rejectedAt || l.createdAt || 0) < 7 * 24 * 60 * 60 * 1000;
  });
  const myInts = interactions.filter((i) => i.vendorId === vendorId);

  const callInts = myInts.filter((i) => chOf(i) === "call");
  const textInts = myInts.filter((i) => chOf(i) === "text");
  const emailInts = myInts.filter((i) => chOf(i) === "email");

  const calledIds = new Set(callInts.map((i) => i.clientId));
  const textedIds = new Set(textInts.map((i) => i.clientId));
  const emailedIds = new Set(emailInts.map((i) => i.clientId));

  const pending = myClients.filter((c) => !calledIds.has(c.id));
  const contacted = myClients.filter((c) => calledIds.has(c.id));
  const orderedCount = callInts.filter((i) => i.status === "ordered").length;

  // Group contacted clients by their MOST RECENT call status (today)
  // This lets us split the "Already called" section into buckets like Orders, Callbacks, etc.
  const lastStatusByClient = new Map();
  // callInts is sorted oldest to newest (or unspecified order). Use timestamp to find most recent.
  callInts.forEach((i) => {
    const prev = lastStatusByClient.get(i.clientId);
    if (!prev || (i.timestamp || 0) > (prev.timestamp || 0)) {
      lastStatusByClient.set(i.clientId, i);
    }
  });
  const contactedOrdered = contacted.filter((c) => lastStatusByClient.get(c.id)?.status === "ordered");
  const contactedCallback = contacted.filter((c) => lastStatusByClient.get(c.id)?.status === "callback");
  const contactedNoAnswer = contacted.filter((c) => lastStatusByClient.get(c.id)?.status === "no_answer");
  const contactedNotInterested = contacted.filter((c) => lastStatusByClient.get(c.id)?.status === "not_interested");
  const contactedPriceIssue = contacted.filter((c) => lastStatusByClient.get(c.id)?.status === "price_issue");
  const contactedOther = contacted.filter((c) => {
    const s = lastStatusByClient.get(c.id)?.status;
    return s === "other" || (s && !["ordered", "callback", "no_answer", "not_interested", "price_issue"].includes(s));
  });

  const callbacks = callInts
    .filter((i) => i.status === "callback" && i.scheduledTime)
    .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

  const [showSMS, setShowSMS] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [rankingPeriod, setRankingPeriod] = useState("week");
  const [rankingInts, setRankingInts] = useState([]);
  const [loadingRanking, setLoadingRanking] = useState(true);

  // Load ALL historical interactions for Sales Insights (full history)
  const [insightsInts, setInsightsInts] = useState([]);
  useEffect(() => {
    if (showInsights) {
      loadAllInteractions().then((historical) => {
        // Realtime "interactions" prop already has today's data; combine for full coverage
        // Use a Map keyed by id to dedupe in case of overlap
        const byId = new Map();
        historical.forEach((i) => byId.set(i.id, i));
        interactions.forEach((i) => byId.set(i.id, i));
        setInsightsInts(Array.from(byId.values()));
      });
    }
  }, [showInsights, interactions]);

  useEffect(() => {
    setLoadingRanking(true);
    const days = rankingPeriod === "week" ? 7 : 30;
    loadInteractionsForDays(days, true).then((historical) => {
      setRankingInts([...historical, ...interactions]);
      setLoadingRanking(false);
    });
  }, [rankingPeriod, interactions]);

  const clientRankingStats = useMemo(() => {
    const myInts2 = rankingInts.filter((i) => i.vendorId === vendorId);
    const callInts2 = myInts2.filter((i) => chOf(i) === "call");
    return myClients.map((c) => {
      const cInts = callInts2.filter((i) => i.clientId === c.id);
      return {
        client: c,
        orders: cInts.filter((i) => i.status === "ordered").length,
        contacts: cInts.length,
      };
    }).sort((a, b) => b.orders - a.orders || b.contacts - a.contacts);
  }, [rankingInts, myClients, vendorId]);

  function intsForClient(clientId) {
    return myInts.filter((i) => i.clientId === clientId);
  }

  // Show Sales Insights as a full-screen sub-view
  if (showInsights) {
    return (
      <SalesInsightsView
        t={t}
        vendorId={vendorId}
        clients={clients}
        vendorInteractions={insightsInts}
        onBack={() => setShowInsights(false)}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto px-5 pt-6 pb-24">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{prettyDate(t.locale)}</div>
        <h1 className="display text-3xl leading-tight">{vendor?.name}</h1>
      </div>

      {/* Phone number setting */}
      {onUpdatePhone && (
        <VendorPhoneCard t={t} currentPhone={myPhone} onUpdate={onUpdatePhone} />
      )}

      {/* Quota progress (if set) */}
      <QuotaProgressCard t={t} vendorId={vendorId} quotas={quotas} interactions={interactions} allInts={interactions} />

      {/* Sales Insights — analyze ordering patterns by day */}
      <button
        onClick={() => setShowInsights(true)}
        className="w-full text-left rounded-2xl p-4 mb-4 flex items-center justify-between card-shadow transition-all hover:translate-x-1"
        style={{ background: "linear-gradient(135deg, #5F2F9D 0%, #7B4DBF 100%)", color: "white" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.18)" }}>
            <BarChart3 size={18} />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm">{t.salesInsights || "Sales Insights"}</div>
            <div className="text-xs opacity-80 truncate">{t.salesInsightsTagline || "See who orders on which days"}</div>
          </div>
        </div>
        <ChevronRight size={18} className="flex-shrink-0 opacity-90" />
      </button>

      {/* Weekly PDF Report — vendor sees their own */}
      <div className="mb-4">
        <WeeklyReportButton
          t={t}
          scope="vendor"
          scopeName={vendor?.name || "Vendor"}
          vendors={vendors}
          clients={clients}
          tasks={tasks}
          vendorIdFilter={vendorId}
        />
      </div>

      {/* Progress card */}
      <div className="bg-white rounded-2xl p-5 card-shadow mb-4">
        <div className="flex items-baseline justify-between mb-3">
          <div className="display text-4xl">{contacted.length}<span className="text-stone-400 text-2xl"> / {myClients.length}</span></div>
          <div className="text-xs uppercase tracking-widest text-stone-500">{t.contacted}</div>
        </div>
        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
          <div className="h-full transition-all" style={{ width: `${myClients.length ? (contacted.length / myClients.length) * 100 : 0}%`, background: "#73A626" }} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <MiniStat icon={MessageSquare} label={t.orders} value={orderedCount} color="#73A626" />
          <MiniStat icon={MessageCircle} label={t.textedStat} value={`${textedIds.size}/${myClients.length}`} color="#5A6B85" />
          <MiniStat icon={Mail} label={t.emailedStat} value={`${emailedIds.size}/${myClients.length}`} color="#5A4A6B" />
        </div>
      </div>

      {/* SMS preview */}
      <button onClick={() => setShowSMS(!showSMS)} className="w-full bg-white rounded-2xl p-3 card-shadow mb-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2"><MessageSquare size={16} className="text-stone-500" /><span className="text-stone-700">{t.sms2pmPreview}</span></div>
        <ChevronRight size={16} className={`text-stone-400 transition-transform ${showSMS ? "rotate-90" : ""}`} />
      </button>
      {showSMS && (
        <div className="rounded-2xl p-4 mb-6" style={{ background: "#1C1B1A", color: "#F5F1EA" }}>
          <div className="text-xs uppercase tracking-widest opacity-60 mb-2">{t.smsTo} {vendor?.phone}</div>
          <div className="text-sm leading-relaxed">
            {t.smsHi(vendor?.name?.split(" ")[0], pending.length)}
            {pending.length > 0 && <br />}
            {pending.slice(0, 5).map((c, idx) => (<span key={c.id}>• {c.name}{idx < Math.min(pending.length, 5) - 1 ? <br /> : null}</span>))}
            {pending.length > 5 && (<><br /><span className="opacity-70">+{pending.length - 5} {t.more}</span></>)}
          </div>
        </div>
      )}

      {/* Scheduled callbacks */}
      {callbacks.length > 0 && (
        <div className="mb-6">
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-1.5">
            <Bell size={11} /> {t.scheduledCallbacks}
          </div>
          <div className="space-y-2">
            {callbacks.map((cb) => {
              const client = myClients.find((c) => c.id === cb.clientId);
              return <ScheduledCallbackCard key={cb.id} t={t} interaction={cb} client={client} onUpdate={onUpdate} onDelete={onUndo} />;
            })}
          </div>
        </div>
      )}

      {/* My Tasks */}
      <div className="mb-6">
        <VendorTasksSection
          t={t}
          vendorId={vendorId}
          tasks={tasks}
          clients={clients}
          vendors={vendors}
          onCreateTask={onCreateTask}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      </div>

      {/* Recent rejections from manager */}
      {myRecentRejected.length > 0 && (
        <div className="mb-6">
          <div className="text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5" style={{ color: "#9C5757" }}>
            <AlertCircle size={11} /> {t.statusRejected}
          </div>
          <div className="space-y-2">
            {myRecentRejected.map((lead) => (
              <div key={lead.id} className="bg-white rounded-2xl p-3 card-shadow" style={{ borderLeft: "3px solid #9C5757" }}>
                <div className="font-medium text-sm">{lead.name}</div>
                <div className="text-[11px] mt-1 italic" style={{ color: "#9C5757" }}>
                  {t.rejectionNotice} "{lead.rejectionNote || "—"}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Leads section */}
      {myLeads.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-3 mt-2">
            <div className="text-xs uppercase tracking-widest text-stone-500 flex items-center gap-1.5">
              <ClipboardList size={11} /> {t.myLeads}
            </div>
            <div className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#FFF5D6", color: "#8B6F1A" }}>{myLeads.length}</div>
          </div>
          <div className="space-y-3 mb-6">
            {myLeads.map((lead) => {
              // Adapt lead shape to ClientCard interface
              const asClient = { id: lead.id, name: lead.name, phone: lead.phone, frequency: "lead" };
              return (
                <div key={lead.id} style={{ borderLeft: "3px solid #F5D785", borderRadius: "16px" }}>
                  <ClientCard t={t} client={asClient} vendorId={vendorId} interactions={intsForClient(lead.id)} allInteractions={interactions} templates={templates} tags={tags} onLog={onLog} onUndo={onUndo} onCloseCallback={onCloseCallback} />
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Section header for customers */}
      {(pending.length > 0 || contacted.length > 0) && (
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-3 mt-2 flex items-center gap-1.5">
          <UserPlus size={11} /> {t.myCustomers}
        </div>
      )}

      {/* Pending — clients not yet called today */}
      <VendorStatusSection t={t} title={t.toContact} icon={Phone} color="#9C5757" bg="#F2E2E2" lightBg="#F9EFEF" clientList={pending}
        renderClient={(client) => (
          <ClientCard key={client.id} t={t} client={client} vendorId={vendorId} interactions={intsForClient(client.id)} allInteractions={interactions} templates={templates} tags={tags} onLog={onLog} onUndo={onUndo} onCloseCallback={onCloseCallback} onUpdateClient={onUpdateClient} onRequestRemoval={onRequestRemoval} onCancelRemovalRequest={onCancelRemovalRequest} />
        )}
      />

      {/* Contacted — grouped by most recent call status, visually distinctive */}
      <VendorStatusSection t={t} title={t.statusOrdered} icon={CheckCircle2} color="#73A626" bg="#E8F2D5" lightBg="#F4F9E8" clientList={contactedOrdered}
        renderClient={(client) => (
          <ClientCard key={client.id} t={t} client={client} vendorId={vendorId} interactions={intsForClient(client.id)} allInteractions={interactions} templates={templates} tags={tags} onLog={onLog} onUndo={onUndo} onCloseCallback={onCloseCallback} onUpdateClient={onUpdateClient} onRequestRemoval={onRequestRemoval} onCancelRemovalRequest={onCancelRemovalRequest} />
        )}
      />
      <VendorStatusSection t={t} title={t.statusCallback} icon={Clock} color="#5A6B85" bg="#E5EAF2" lightBg="#F2F5F9" clientList={contactedCallback}
        renderClient={(client) => (
          <ClientCard key={client.id} t={t} client={client} vendorId={vendorId} interactions={intsForClient(client.id)} allInteractions={interactions} templates={templates} tags={tags} onLog={onLog} onUndo={onUndo} onCloseCallback={onCloseCallback} onUpdateClient={onUpdateClient} onRequestRemoval={onRequestRemoval} onCancelRemovalRequest={onCancelRemovalRequest} />
        )}
      />
      <VendorStatusSection t={t} title={t.statusNoAnswer} icon={PhoneOff} color="#8B7355" bg="#F0EAE0" lightBg="#FAF6EE" clientList={contactedNoAnswer}
        renderClient={(client) => (
          <ClientCard key={client.id} t={t} client={client} vendorId={vendorId} interactions={intsForClient(client.id)} allInteractions={interactions} templates={templates} tags={tags} onLog={onLog} onUndo={onUndo} onCloseCallback={onCloseCallback} onUpdateClient={onUpdateClient} onRequestRemoval={onRequestRemoval} onCancelRemovalRequest={onCancelRemovalRequest} />
        )}
      />
      <VendorStatusSection t={t} title={t.statusPriceIssue} icon={DollarSign} color="#B8860B" bg="#FFF5D6" lightBg="#FFFBEC" clientList={contactedPriceIssue}
        renderClient={(client) => (
          <ClientCard key={client.id} t={t} client={client} vendorId={vendorId} interactions={intsForClient(client.id)} allInteractions={interactions} templates={templates} tags={tags} onLog={onLog} onUndo={onUndo} onCloseCallback={onCloseCallback} onUpdateClient={onUpdateClient} onRequestRemoval={onRequestRemoval} onCancelRemovalRequest={onCancelRemovalRequest} />
        )}
      />
      <VendorStatusSection t={t} title={t.statusNotInterested} icon={XCircle} color="#9C5757" bg="#F2E2E2" lightBg="#F9EFEF" clientList={contactedNotInterested}
        renderClient={(client) => (
          <ClientCard key={client.id} t={t} client={client} vendorId={vendorId} interactions={intsForClient(client.id)} allInteractions={interactions} templates={templates} tags={tags} onLog={onLog} onUndo={onUndo} onCloseCallback={onCloseCallback} onUpdateClient={onUpdateClient} onRequestRemoval={onRequestRemoval} onCancelRemovalRequest={onCancelRemovalRequest} />
        )}
      />
      <VendorStatusSection t={t} title={t.statusOther || "Other"} icon={X} color="#5A4A6B" bg="#EAE3F0" lightBg="#F4EFF7" clientList={contactedOther}
        renderClient={(client) => (
          <ClientCard key={client.id} t={t} client={client} vendorId={vendorId} interactions={intsForClient(client.id)} allInteractions={interactions} templates={templates} tags={tags} onLog={onLog} onUndo={onUndo} onCloseCallback={onCloseCallback} onUpdateClient={onUpdateClient} onRequestRemoval={onRequestRemoval} onCancelRemovalRequest={onCancelRemovalRequest} />
        )}
      />

      {pending.length === 0 && contacted.length === 0 && myLeads.length === 0 && (
        <div className="text-center py-12 text-stone-500 text-sm">{t.noClients}</div>
      )}

      {/* Request new lead button */}
      <RequestLeadButton t={t} onRequestLead={onRequestLead} />

      {/* MY GROWTH */}
      <div className="mt-10 pt-6" style={{ borderTop: "1px solid rgba(28,27,26,0.08)" }}>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={18} style={{ color: "#5F2F9D" }} />
          <h2 className="display text-2xl">{t.growth}</h2>
        </div>
        <VendorGrowth t={t} vendorId={vendorId} leads={leads} clients={clients} interactions={interactions} />
      </div>

      {/* CLIENT RANKING */}
      <div className="mt-10 pt-6" style={{ borderTop: "1px solid rgba(28,27,26,0.08)" }}>
        <div className="flex items-center gap-2 mb-1">
          <Award size={18} style={{ color: "#5F2F9D" }} />
          <h2 className="display text-2xl">{t.clientRanking}</h2>
        </div>
        <p className="text-xs text-stone-500 mb-4">{t.clientRankingSub}</p>
        <PeriodTabs value={rankingPeriod} onChange={setRankingPeriod} t={t} options={[
          { key: "week", labelKey: "thisWeek" },
          { key: "month", labelKey: "thisMonth" },
        ]} />
        {loadingRanking ? (
          <div className="text-center py-8 text-stone-400 text-sm display">{t.loadingReport}</div>
        ) : clientRankingStats.length === 0 ? (
          <div className="text-center py-8 text-stone-400 text-sm">{t.noActivity}</div>
        ) : (
          <ClientRankingList t={t} stats={clientRankingStats} />
        )}
      </div>
    </div>
  );
}

function RequestLeadButton({ t, onRequestLead }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!name.trim()) { setError(t.nameRequired); return; }
    const result = await onRequestLead({ name, phone, note });
    if (result.success) {
      setSubmitted(true);
      setTimeout(() => {
        setName(""); setPhone(""); setNote(""); setSubmitted(false); setOpen(false); setError("");
      }, 1800);
    } else {
      setError(result.error);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full mt-10 rounded-2xl p-4 flex items-center justify-center gap-2 text-white card-shadow font-semibold"
        style={{ background: BRAND_PURPLE }}
      >
        <UserPlus size={16} /> {t.requestNewLead}
      </button>
    );
  }

  return (
    <div className="mt-10 bg-white rounded-2xl p-4 card-shadow space-y-2" style={{ border: `1px solid ${BRAND_PURPLE}25` }}>
      <div className="flex items-center justify-between mb-1">
        <div>
          <div className="text-sm font-semibold" style={{ color: BRAND_PURPLE }}>{t.requestNewLead}</div>
          <div className="text-[11px] text-stone-500">{t.requestLeadSubtitle}</div>
        </div>
        <button onClick={() => { setOpen(false); setError(""); }} className="text-stone-400 hover:text-stone-600 p-1"><X size={14} /></button>
      </div>
      {submitted ? (
        <div className="text-sm text-center py-3 px-3 rounded-lg flex items-center justify-center gap-1.5" style={{ background: "#E8F0E9", color: "#2D5A3D" }}>
          <Check size={14} /> {t.leadSubmitted}
        </div>
      ) : (
        <>
          <input value={name} onChange={(e) => { setName(e.target.value); setError(""); }} placeholder={t.leadName} autoFocus className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phone} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.optionalNote} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
          {error && <div className="text-xs px-2 py-1 rounded-md" style={{ background: "#F2E2E2", color: "#9C5757" }}>{error}</div>}
          <button onClick={submit} className="w-full py-2 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-1" style={{ background: BRAND_PURPLE }}>
            <UserPlus size={14} /> {t.submitRequest}
          </button>
        </>
      )}
    </div>
  );
}

function ScheduledCallbackCard({ t, interaction, client, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [time, setTime] = useState(interaction.scheduledTime || "");
  const reminderTime = interaction.scheduledTime ? subtractMin(interaction.scheduledTime, 5) : "";

  async function save() {
    if (!time || time === interaction.scheduledTime) { setEditing(false); return; }
    await onUpdate(interaction.id, { scheduledTime: time });
    setEditing(false);
  }
  function cancel() {
    setTime(interaction.scheduledTime || "");
    setEditing(false);
  }

  return (
    <div className="bg-white rounded-2xl p-3 card-shadow flex items-center gap-3">
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#E5EAF2", color: "#5A6B85" }}>
        <Bell size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{client?.name}</div>
        {!editing ? (
          <div className="text-xs text-stone-500">
            {t.callbackAt} <span className="font-medium" style={{ color: "#5A6B85" }}>{interaction.scheduledTime}</span> · {t.reminderAt} {reminderTime}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} autoFocus
              className="bg-stone-50 rounded-lg px-2 py-1 text-xs outline-none" style={{ color: "#1C1B1A" }} />
            <button onClick={cancel} className="text-[10px] text-stone-500 px-2 py-1 rounded-md hover:bg-stone-100">{t.cancel}</button>
            <button onClick={save} disabled={!time} className="text-[10px] font-semibold px-2 py-1 rounded-md text-white disabled:opacity-40" style={{ background: "#5A6B85" }}>{t.save}</button>
          </div>
        )}
      </div>
      {!editing && (
        <button onClick={() => setEditing(true)} className="px-2 py-1 rounded-md flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide flex-shrink-0" style={{ background: "#E5EAF2", color: "#5A6B85" }}>
          <Pencil size={10} /> {t.changeTime}
        </button>
      )}
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, color }) {
  return (
    <div>
      <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1"><Icon size={10} /> {label}</div>
      <div className="display text-xl" style={{ color }}>{value}</div>
    </div>
  );
}

// ---------- CLIENT CARD ----------
// Visually distinctive section header for vendor's grouped client lists.
// Each section has a colored header bar with icon, title and count.
// Renders nothing if clientList is empty so sections collapse cleanly.
function VendorStatusSection({ t, title, icon: Icon, color, bg, lightBg, clientList, renderClient }) {
  if (!clientList || clientList.length === 0) return null;
  return (
    <div className="mb-6 rounded-2xl overflow-hidden" style={{ background: lightBg, border: `1px solid ${bg}` }}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5" style={{ background: bg }}>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.6)" }}>
            <Icon size={14} style={{ color }} />
          </div>
          <div className="font-bold text-sm uppercase tracking-wide truncate" style={{ color }}>{title}</div>
        </div>
        <div className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: color, color: "#fff" }}>
          {clientList.length}
        </div>
      </div>
      {/* Client list */}
      <div className="p-3 space-y-2.5">
        {clientList.map((client) => renderClient(client))}
      </div>
    </div>
  );
}

function ClientCard({ t, client, vendorId, interactions, onLog, onUndo, onCloseCallback, allInteractions, templates, tags, onUpdateClient, onRequestRemoval, onCancelRemovalRequest }) {
  const callInt = interactions.find((i) => chOf(i) === "call");
  const textInt = interactions.find((i) => chOf(i) === "text");
  const emailInt = interactions.find((i) => chOf(i) === "email");

  const [showHistory, setShowHistory] = useState(false);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [showTemplate, setShowTemplate] = useState(null); // null | "text" | "email"

  const clientTags = (tags || []).filter((tg) => (client.tags || []).includes(tg.id));

  // Count "not_interested" calls for this client to show warning badge before auto-archive
  const notInterestedCount = (allInteractions || [])
    .filter((i) => i.clientId === client.id && i.channel === "call" && i.status === "not_interested").length;

  function handleSendTemplate({ template, channel, text }) {
    // Open the appropriate channel
    if (channel === "whatsapp") {
      const cleanPhone = (client.phone || "").replace(/[^0-9]/g, "");
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, "_blank");
    } else if (channel === "sms") {
      const cleanPhone = (client.phone || "").replace(/[^0-9+]/g, "");
      window.open(`sms:${cleanPhone}?body=${encodeURIComponent(text)}`, "_blank");
    } else if (channel === "email") {
      window.open(`mailto:?body=${encodeURIComponent(text)}`, "_blank");
    }
    // Log the interaction
    onLog({ clientId: client.id, vendorId, channel: channel === "whatsapp" || channel === "sms" ? "text" : "email", status: "sent", note: `Template: ${template.title}` });
    setShowTemplate(null);
  }

  async function saveTags(tagIds) {
    if (onUpdateClient) {
      await onUpdateClient(client.id, { tags: tagIds });
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow">
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="font-medium truncate flex-1">{client.name}</div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {onUpdateClient && tags && tags.length > 0 && (
              <button onClick={() => setShowTagPicker(true)} className="text-stone-400 hover:text-stone-700 p-1" title={t.tags}>
                <Tag size={12} />
              </button>
            )}
            {allInteractions && (
              <button onClick={() => setShowHistory(true)} className="text-stone-400 hover:text-stone-700 p-1" title={t.fullHistory}>
                <History size={12} />
              </button>
            )}
            {/* Request removal button — only for vendors who have onRequestRemoval handler */}
            {onRequestRemoval && !client.removalRequested && (
              <button
                onClick={() => {
                  if (confirm(t.requestRemovalConfirm || "Request manager to remove this client?")) {
                    onRequestRemoval(client.id);
                  }
                }}
                className="text-stone-400 hover:text-red-600 p-1"
                title={t.requestRemoval || "Request removal"}
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        </div>
        <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
          <Phone size={11} />{client.phone}<span className="text-stone-300">·</span><span>{freqLabel(client.frequency, t)}</span>
        </div>
        {clientTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {clientTags.map((tg) => <TagBadge key={tg.id} tag={tg} />)}
          </div>
        )}
        {notInterestedCount === 2 && (
          <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: "#FFF5D6", color: "#8B6F1A" }}>
            <AlertCircle size={10} />
            {t.notInterestedWarning || "2 of 3 'not interested' — will auto-archive next time"}
          </div>
        )}
        {client.removalRequested && (
          <div className="mt-1.5 flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-[11px]" style={{ background: "#F2E2E2", color: "#9C5757" }}>
            <div className="flex items-center gap-1 font-semibold flex-1 min-w-0">
              <AlertCircle size={11} className="flex-shrink-0" />
              <span className="truncate">{t.removalPendingApproval || "Removal pending manager approval"}</span>
            </div>
            {onCancelRemovalRequest && (
              <button
                onClick={() => onCancelRemovalRequest(client.id)}
                className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.7)", color: "#9C5757" }}
              >
                {t.cancelRequest || "Cancel"}
              </button>
            )}
          </div>
        )}
      </div>

      <CallSection t={t} client={client} vendorId={vendorId} interaction={callInt} onLog={onLog} onUndo={onUndo} onCloseCallback={onCloseCallback} />

      <div className="grid grid-cols-2 gap-2 mt-3">
        <ChannelToggle
          t={t} icon={MessageCircle}
          label={t.textChannel} doneLabel={t.textedDone}
          interaction={textInt}
          onLog={() => onLog({ clientId: client.id, vendorId, channel: "text", status: "sent" })}
          onUndo={() => textInt && onUndo(textInt.id)}
          color="#1C5E6E" bg="#D7EDF1"
          onTemplate={templates && templates.length > 0 ? () => setShowTemplate("text") : null}
        />
        <ChannelToggle
          t={t} icon={Mail}
          label={t.emailChannel} doneLabel={t.emailedDone}
          interaction={emailInt}
          onLog={() => onLog({ clientId: client.id, vendorId, channel: "email", status: "sent" })}
          onUndo={() => emailInt && onUndo(emailInt.id)}
          color="#5A4A6B" bg="#EAE3F0"
          onTemplate={templates && templates.length > 0 ? () => setShowTemplate("email") : null}
        />
      </div>

      {showHistory && allInteractions && (
        <ClientHistoryDrawer
          t={t}
          client={client}
          interactions={allInteractions}
          onClose={() => setShowHistory(false)}
          onUpdateClient={onUpdateClient}
        />
      )}

      {showTagPicker && (
        <TagPickerModal
          t={t}
          tags={tags}
          currentTagIds={client.tags || []}
          onSave={saveTags}
          onClose={() => setShowTagPicker(false)}
        />
      )}

      {showTemplate && (
        <TemplatePickerModal
          t={t}
          templates={templates}
          client={client}
          onSend={handleSendTemplate}
          onClose={() => setShowTemplate(null)}
        />
      )}
    </div>
  );
}

// ---------- CALL SECTION ----------
function CallSection({ t, client, vendorId, interaction, onLog, onUndo, onCloseCallback }) {
  const [flow, setFlow] = useState(null);
  // flow: null | "callback" | "price_issue" | "other" | "not_interested" | "not_interested_other"
  const [note, setNote] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [reasonText, setReasonText] = useState("");

  function reset() { setFlow(null); setNote(""); setScheduledTime(""); setReasonText(""); }

  if (interaction) {
    return <CallStatusDisplay t={t} interaction={interaction} onUndo={() => onUndo(interaction.id)} onCloseCallback={onCloseCallback} />;
  }

  if (!flow) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {STATUS_KEYS.map((key) => {
          const s = STATUS_META[key];
          const Icon = s.icon;
          const handler = async () => {
            if (key === "ordered" || key === "no_answer") {
              await onLog({ clientId: client.id, vendorId, channel: "call", status: key });
            } else {
              setFlow(key);
            }
          };
          return (
            <button key={key} onClick={handler} className="rounded-xl p-2.5 flex flex-col items-center gap-1 transition-all hover:scale-[1.03]" style={{ background: s.bg, color: s.color }}>
              <Icon size={18} strokeWidth={2} />
              <span className="text-[10px] leading-tight font-medium text-center">{statusLabel(key, t)}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // ---------- callback flow ----------
  if (flow === "callback") {
    const reminderTime = scheduledTime ? subtractMin(scheduledTime, 5) : "";
    return (
      <div className="rounded-xl p-3 space-y-2" style={{ background: STATUS_META.callback.bg, color: STATUS_META.callback.color }}>
        <div className="text-xs font-medium uppercase tracking-wide">{t.callbackTime}</div>
        <input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} autoFocus
          className="w-full bg-white/70 rounded-lg px-3 py-2 text-sm outline-none" style={{ color: "#1C1B1A" }} />
        {scheduledTime && (
          <div className="text-[11px] flex items-center gap-1 opacity-90">
            <Bell size={11} /> {t.reminderInfo(reminderTime)}
          </div>
        )}
        <div className="flex gap-2 pt-1">
          <button onClick={reset} className="flex-1 py-2 rounded-lg bg-white/70 text-xs font-medium" style={{ color: "#1C1B1A" }}>{t.cancel}</button>
          <button onClick={async () => {
            if (!scheduledTime) return;
            await onLog({ clientId: client.id, vendorId, channel: "call", status: "callback", scheduledTime });
            reset();
          }} disabled={!scheduledTime}
            className="flex-1 py-2 rounded-lg text-xs font-medium text-white disabled:opacity-40" style={{ background: STATUS_META.callback.color }}>
            {t.confirm}
          </button>
        </div>
      </div>
    );
  }

  // ---------- price_issue or other (note flow) ----------
  if (flow === "price_issue" || flow === "other") {
    const meta = STATUS_META[flow];
    return (
      <div className="rounded-xl p-3 space-y-2" style={{ background: meta.bg, color: meta.color }}>
        <div className="text-xs font-medium uppercase tracking-wide">{statusLabel(flow, t)}</div>
        <input type="text" autoFocus value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.briefNote}
          className="w-full bg-white/70 rounded-lg px-3 py-2 text-sm outline-none" style={{ color: "#1C1B1A" }} />
        <div className="flex gap-2 pt-1">
          <button onClick={reset} className="flex-1 py-2 rounded-lg bg-white/70 text-xs font-medium" style={{ color: "#1C1B1A" }}>{t.cancel}</button>
          <button onClick={async () => { await onLog({ clientId: client.id, vendorId, channel: "call", status: flow, note }); reset(); }}
            className="flex-1 py-2 rounded-lg text-xs font-medium text-white" style={{ background: meta.color }}>
            {t.confirm}
          </button>
        </div>
      </div>
    );
  }

  // ---------- not_interested: reason picker ----------
  if (flow === "not_interested") {
    return (
      <div className="rounded-xl p-3 space-y-2" style={{ background: STATUS_META.not_interested.bg, color: STATUS_META.not_interested.color }}>
        <div className="text-xs font-medium uppercase tracking-wide">{t.whyNotInterested}</div>
        <div className="space-y-1.5">
          {NOT_INTERESTED_REASONS.map((reason) => (
            <button key={reason} onClick={async () => {
              if (reason === "other_reason") { setFlow("not_interested_other"); return; }
              await onLog({ clientId: client.id, vendorId, channel: "call", status: "not_interested", subReason: reason });
              reset();
            }} className="w-full text-left bg-white/70 rounded-lg px-3 py-2 text-xs font-medium hover:bg-white transition-colors" style={{ color: "#1C1B1A" }}>
              {reasonLabel(reason, t)}
            </button>
          ))}
        </div>
        <button onClick={reset} className="w-full py-2 rounded-lg bg-white/70 text-xs font-medium mt-1" style={{ color: "#1C1B1A" }}>{t.cancel}</button>
      </div>
    );
  }

  // ---------- not_interested -> other reason text ----------
  if (flow === "not_interested_other") {
    return (
      <div className="rounded-xl p-3 space-y-2" style={{ background: STATUS_META.not_interested.bg, color: STATUS_META.not_interested.color }}>
        <div className="text-xs font-medium uppercase tracking-wide">{t.reasonOther}</div>
        <input type="text" autoFocus value={reasonText} onChange={(e) => setReasonText(e.target.value)} placeholder={t.writeReason}
          className="w-full bg-white/70 rounded-lg px-3 py-2 text-sm outline-none" style={{ color: "#1C1B1A" }} />
        <div className="flex gap-2 pt-1">
          <button onClick={() => setFlow("not_interested")} className="flex-1 py-2 rounded-lg bg-white/70 text-xs font-medium" style={{ color: "#1C1B1A" }}>{t.cancel}</button>
          <button onClick={async () => {
            await onLog({ clientId: client.id, vendorId, channel: "call", status: "not_interested", subReason: "other_reason", note: reasonText });
            reset();
          }} disabled={!reasonText.trim()}
            className="flex-1 py-2 rounded-lg text-xs font-medium text-white disabled:opacity-40" style={{ background: STATUS_META.not_interested.color }}>
            {t.confirm}
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function CallStatusDisplay({ t, interaction, onUndo, onCloseCallback }) {
  const meta = STATUS_META[interaction.status];
  const Icon = meta.icon;
  const [showCloseModal, setShowCloseModal] = useState(false);
  let detail = "";
  if (interaction.status === "callback" && interaction.scheduledTime) {
    detail = `${t.callbackAt} ${interaction.scheduledTime}`;
  } else if (interaction.status === "not_interested" && interaction.subReason) {
    if (interaction.subReason === "other_reason" && interaction.note) detail = interaction.note;
    else detail = reasonLabel(interaction.subReason, t);
  } else if (interaction.note) {
    detail = interaction.note;
  }

  const isCallback = interaction.status === "callback";
  const showCloseButton = isCallback && onCloseCallback;

  return (
    <>
      <div className="rounded-xl p-3" style={{ background: meta.bg, color: meta.color }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.5)" }}>
              <Icon size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium leading-tight">{statusLabel(interaction.status, t)}</div>
              {detail && <div className="text-[11px] opacity-80 truncate">{detail}</div>}
            </div>
          </div>
          <button onClick={onUndo} className="ml-2 px-2 py-1 rounded-md flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide flex-shrink-0" style={{ background: "rgba(255,255,255,0.65)", color: meta.color }}>
            <Pencil size={10} /> {t.change}
          </button>
        </div>
        {showCloseButton && (
          <button
            onClick={() => setShowCloseModal(true)}
            className="w-full mt-2.5 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wide flex items-center justify-center gap-1"
            style={{ background: "rgba(255,255,255,0.85)", color: meta.color }}
          >
            <CheckCircle2 size={11} /> {t.closeCallback}
          </button>
        )}
      </div>
      {showCloseModal && (
        <CloseCallbackModal
          t={t}
          callbackInteraction={interaction}
          onClose={() => setShowCloseModal(false)}
          onCloseCallback={onCloseCallback}
        />
      )}
    </>
  );
}

// Modal: when user wants to close a pending callback by reporting the actual outcome
function CloseCallbackModal({ t, callbackInteraction, onClose, onCloseCallback }) {
  const [submitting, setSubmitting] = useState(false);

  async function pickOption(newStatus) {
    setSubmitting(true);
    let note = "";
    if (newStatus === "ordered") note = `Closed callback (originally scheduled ${callbackInteraction.scheduledTime || "earlier"}): client ordered`;
    else if (newStatus === "price_issue") note = `Closed callback: price issue`;
    else if (newStatus === "not_interested") note = `Closed callback: client no longer interested`;
    else if (newStatus === "other") note = `Callback cancelled (not contacted)`;

    await onCloseCallback({ originalCallbackId: callbackInteraction.id, newStatus, note });
    setSubmitting(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs uppercase tracking-widest text-stone-500 flex items-center gap-1.5">
              <CheckCircle2 size={12} /> {t.closeCallback}
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1"><X size={16} /></button>
          </div>
          <p className="text-sm text-stone-600 mb-4">{t.closeCallbackHelp}</p>

          <div className="space-y-2">
            <button
              disabled={submitting}
              onClick={() => pickOption("ordered")}
              className="w-full flex items-center gap-3 rounded-xl p-3 text-left transition-all hover:scale-[1.01] disabled:opacity-50"
              style={{ background: STATUS_META.ordered.bg, color: STATUS_META.ordered.color }}
            >
              <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.5)" }}>
                <CheckCircle2 size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{t.closeAsOrdered}</div>
                <div className="text-[11px] opacity-80">{t.closeAsOrderedHelp}</div>
              </div>
            </button>

            <button
              disabled={submitting}
              onClick={() => pickOption("price_issue")}
              className="w-full flex items-center gap-3 rounded-xl p-3 text-left transition-all hover:scale-[1.01] disabled:opacity-50"
              style={{ background: STATUS_META.price_issue.bg, color: STATUS_META.price_issue.color }}
            >
              <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.5)" }}>
                <DollarSign size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{t.closeAsPriceIssue}</div>
                <div className="text-[11px] opacity-80">{t.closeAsPriceIssueHelp}</div>
              </div>
            </button>

            <button
              disabled={submitting}
              onClick={() => pickOption("not_interested")}
              className="w-full flex items-center gap-3 rounded-xl p-3 text-left transition-all hover:scale-[1.01] disabled:opacity-50"
              style={{ background: STATUS_META.not_interested.bg, color: STATUS_META.not_interested.color }}
            >
              <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.5)" }}>
                <XCircle size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{t.closeAsNotInterested}</div>
                <div className="text-[11px] opacity-80">{t.closeAsNotInterestedHelp}</div>
              </div>
            </button>

            <button
              disabled={submitting}
              onClick={() => pickOption("other")}
              className="w-full flex items-center gap-3 rounded-xl p-3 text-left transition-all hover:scale-[1.01] disabled:opacity-50"
              style={{ background: "#F0EAE0", color: "#8B7355" }}
            >
              <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.5)" }}>
                <X size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{t.closeAsCancel}</div>
                <div className="text-[11px] opacity-80">{t.closeAsCancelHelp}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- CHANNEL TOGGLE ----------
function ChannelToggle({ t, icon: Icon, label, doneLabel, interaction, onLog, onUndo, color, bg, onTemplate }) {
  if (interaction) {
    return (
      <div className="rounded-xl p-2.5 flex items-center justify-between gap-1.5" style={{ background: bg, color }}>
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <Icon size={14} />
          <span className="text-xs font-medium truncate">{doneLabel}</span>
        </div>
        <button onClick={onUndo} className="opacity-50 hover:opacity-100 flex-shrink-0"><Trash2 size={11} /></button>
      </div>
    );
  }
  return (
    <div className="rounded-xl flex overflow-hidden" style={{ background: bg }}>
      <button onClick={onLog} className="flex-1 p-2.5 flex items-center justify-center gap-1.5 transition-all hover:bg-black/5" style={{ color }}>
        <Icon size={14} />
        <span className="text-xs font-medium leading-tight truncate">{label}</span>
      </button>
      {onTemplate && (
        <button onClick={onTemplate} className="px-2 border-l flex items-center justify-center hover:bg-black/5" style={{ color, borderLeftColor: "rgba(0,0,0,0.08)" }} title={t.pickTemplate}>
          <MessageSquareText size={12} />
        </button>
      )}
    </div>
  );
}

// ---------- ADMIN VIEW ----------
function AdminView({ t, vendors, clients, leads, interactions, quotas, onBack }) {
  const [period, setPeriod] = useState("today");
  const [periodInts, setPeriodInts] = useState(interactions);
  const [loadingPeriod, setLoadingPeriod] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [outcomeModal, setOutcomeModal] = useState(null);

  useEffect(() => {
    if (period === "today") { setPeriodInts(interactions); return; }
    setLoadingPeriod(true);
    const days = period === "week" ? 7 : 30;
    loadInteractionsForDays(days, true).then((historical) => {
      setPeriodInts([...historical, ...interactions]);
      setLoadingPeriod(false);
    });
  }, [period, interactions]);

  const stats = useMemo(() => vendors.map((v) => {
    const myClients = clients.filter((c) => c.vendorId === v.id && !c.archived);
    const myInts = periodInts.filter((i) => i.vendorId === v.id);
    const callInts = myInts.filter((i) => chOf(i) === "call");
    const textInts = myInts.filter((i) => chOf(i) === "text");
    const emailInts = myInts.filter((i) => chOf(i) === "email");
    const calledIds = new Set(callInts.map((i) => i.clientId));
    const textedIds = new Set(textInts.map((i) => i.clientId));
    const emailedIds = new Set(emailInts.map((i) => i.clientId));
    const contacted = myClients.filter((c) => calledIds.has(c.id));
    const pending = myClients.filter((c) => !calledIds.has(c.id));
    const orders = callInts.filter((i) => i.status === "ordered");
    const callbacks = callInts.filter((i) => i.status === "callback");
    const noAnswers = callInts.filter((i) => i.status === "no_answer");
    const priceIssues = callInts.filter((i) => i.status === "price_issue");
    const notInterested = callInts.filter((i) => i.status === "not_interested");
    const otherStatus = callInts.filter((i) => i.status === "other");

    // Recurrent clients: those who placed 2+ orders in the period
    const ordersByClient = {};
    orders.forEach((o) => { ordersByClient[o.clientId] = (ordersByClient[o.clientId] || 0) + 1; });
    const recurrentList = Object.entries(ordersByClient)
      .filter(([, c]) => c >= 2)
      .map(([id, c]) => ({ client: clients.find((cc) => cc.id === id), count: c }))
      .sort((a, b) => b.count - a.count);

    return {
      vendor: v, myClients, contacted, pending, myInts, callInts, textInts, emailInts,
      textedIds, emailedIds, orders, callbacks, noAnswers, priceIssues, notInterested, otherStatus,
      recurrentCount: recurrentList.length,
      recurrentRate: myClients.length ? recurrentList.length / myClients.length : 0,
      recurrentList,
      rate: myClients.length ? contacted.length / myClients.length : 0,
    };
  }), [vendors, clients, periodInts]);

  const totalContacted = stats.reduce((s, x) => s + x.contacted.length, 0);
  const totalClients = stats.reduce((s, x) => s + x.myClients.length, 0);
  const totalOrders = stats.reduce((s, x) => s + x.orders.length, 0);
  const totalCallbacks = stats.reduce((s, x) => s + x.callbacks.length, 0);
  const totalNoAnswers = stats.reduce((s, x) => s + x.noAnswers.length, 0);
  const totalPriceIssues = stats.reduce((s, x) => s + x.priceIssues.length, 0);
  const totalNotInterested = stats.reduce((s, x) => s + x.notInterested.length, 0);
  const totalOtherStatus = stats.reduce((s, x) => s + x.otherStatus.length, 0);
  const totalCalls = stats.reduce((s, x) => s + x.callInts.length, 0);
  const totalTexted = stats.reduce((s, x) => s + x.textedIds.size, 0);
  const totalEmailed = stats.reduce((s, x) => s + x.emailedIds.size, 0);
  const totalRecurrent = stats.reduce((s, x) => s + x.recurrentCount, 0);

  // For week/month: rank by recurrent clients then by total orders
  const recurrentRanking = stats.slice().sort((a, b) =>
    b.recurrentCount - a.recurrentCount || b.orders.length - a.orders.length
  );
  const topVendor = recurrentRanking[0];

  // For today: keep the existing ranking by contact rate
  const liveRanking = stats.slice().sort((a, b) => b.rate - a.rate);

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6 pb-24">
      <button onClick={onBack} className="flex items-center gap-1 text-stone-600 text-sm mb-6"><ArrowLeft size={16} /> {t.back}</button>
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{prettyDate(t.locale)}</div>
        <h1 className="display text-3xl leading-tight flex items-center gap-2"><Crown size={24} /> {t.dashboard}</h1>
      </div>

      <PeriodTabs value={period} onChange={setPeriod} t={t} options={[
        { key: "today", labelKey: "today" },
        { key: "week", labelKey: "thisWeek" },
        { key: "month", labelKey: "thisMonth" },
      ]} />

      {loadingPeriod ? (
        <div className="text-center py-12 text-stone-400 text-sm display">{t.loadingReport}</div>
      ) : (
        <>
          {period !== "today" && topVendor && topVendor.recurrentCount > 0 && (
            <BestSellerCard t={t} top={topVendor} />
          )}

          {period === "today" ? (
            <>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <StatCard label={t.contactedToday} value={`${totalContacted}/${totalClients}`} accent="#73A626" />
                <StatCard label={t.orders} value={totalOrders} accent="#1C1B1A" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <StatCard label={t.textedStat} value={`${totalTexted}/${totalClients}`} accent="#1C5E6E" />
                <StatCard label={t.emailedStat} value={`${totalEmailed}/${totalClients}`} accent="#5A4A6B" />
              </div>

              {totalCalls > 0 && (
                <CallOutcomesBreakdown
                  t={t}
                  totalCalls={totalCalls}
                  orders={totalOrders}
                  callbacks={totalCallbacks}
                  noAnswers={totalNoAnswers}
                  priceIssues={totalPriceIssues}
                  notInterested={totalNotInterested}
                  other={totalOtherStatus}
                />
              )}

              <button onClick={() => setShowReport(!showReport)} className="w-full rounded-2xl p-4 card-shadow mb-6 flex items-center justify-between" style={{ background: "#1C1B1A", color: "#F5F1EA" }}>
                <div className="flex items-center gap-2"><MessageSquare size={16} /><span className="text-sm">{t.report4pmPreview}</span></div>
                <ChevronRight size={16} className={`opacity-70 transition-transform ${showReport ? "rotate-90" : ""}`} />
              </button>
              {showReport && (<div className="space-y-3 mb-8">{stats.map((s) => (<ReportCard key={s.vendor.id} t={t} stat={s} />))}</div>)}
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <StatCard label={t.totalCalled} value={totalContacted} accent="#73A626" />
                <StatCard label={t.orders} value={totalOrders} accent="#1C1B1A" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <StatCard label={t.recurrentClients} value={totalRecurrent} accent="#5F2F9D" />
                <StatCard label={t.activeReps} value={`${stats.filter((s) => s.contacted.length > 0).length}/${vendors.length}`} accent="#5A6B85" />
              </div>

              {totalCalls > 0 && (
                <CallOutcomesBreakdown
                  t={t}
                  totalCalls={totalCalls}
                  orders={totalOrders}
                  callbacks={totalCallbacks}
                  noAnswers={totalNoAnswers}
                  priceIssues={totalPriceIssues}
                  notInterested={totalNotInterested}
                  other={totalOtherStatus}
                />
              )}

              <div className="text-xs uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-1.5">
                <Award size={11} /> {t.recurrentRanking}
              </div>
              <RecurrentClientsRanking t={t} ranking={recurrentRanking} />
              <div className="text-[11px] text-stone-400 italic mt-2 mb-8">{t.recurrentDef}</div>

              <div className="text-xs uppercase tracking-widest text-stone-500 mb-1 flex items-center gap-1.5">
                <TrendingUp size={11} /> {t.repBestWorst}
              </div>
              <p className="text-[11px] text-stone-400 mb-3">{t.repBestWorstSub}</p>
              <RepClientRankings t={t} stats={recurrentRanking} />
              <div className="mb-8" />
            </>
          )}

          <div className="text-xs uppercase tracking-widest text-stone-500 mb-3">{t.repsLive}</div>
          <div className="space-y-3 mb-8">
            {liveRanking.map((s, idx) => (<VendorLiveCard key={s.vendor.id} t={t} stat={s} rank={idx + 1} clients={clients} onPillClick={setOutcomeModal} />))}
          </div>

          <div className="text-xs uppercase tracking-widest text-stone-500 mb-3">{t.contactFrequency}</div>
          <div className="bg-white rounded-2xl p-4 card-shadow"><FrequencyBars stats={stats} /></div>
        </>
      )}

      {/* Team quota progress */}
      {quotas && Object.keys(quotas).length > 0 && (
        <div className="mt-10 pt-6" style={{ borderTop: "1px solid rgba(28,27,26,0.08)" }}>
          <div className="flex items-center gap-2 mb-1">
            <Target size={18} style={{ color: "#5F2F9D" }} />
            <h2 className="display text-2xl">{t.quotaTeamView}</h2>
          </div>
          <p className="text-xs text-stone-500 mb-4">{t.quotasSub}</p>
          <TeamQuotaOverview t={t} vendors={vendors} quotas={quotas} interactions={interactions} />
        </div>
      )}

      {/* Conversion analytics — always visible, has its own period selector */}
      <div className="mt-10 pt-6" style={{ borderTop: "1px solid rgba(28,27,26,0.08)" }}>
        <div className="flex items-center gap-2 mb-1">
          <UserPlus size={18} style={{ color: "#5F2F9D" }} />
          <h2 className="display text-2xl">{t.conversionLeaderboard}</h2>
        </div>
        <p className="text-xs text-stone-500 mb-4">{t.repBestWorstSub}</p>
        <ManagerConversionAnalytics t={t} vendors={vendors} clients={clients} leads={leads || []} interactions={interactions} />
      </div>

      {outcomeModal && (
        <VendorOutcomeModal t={t} data={outcomeModal} onClose={() => setOutcomeModal(null)} />
      )}
    </div>
  );
}

function TeamQuotaOverview({ t, vendors, quotas, interactions }) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  const stats = vendors.map((v) => {
    const goal = quotas[v.id] || { ordersGoal: 0, callsGoal: 0 };
    const myInts = (interactions || []).filter((i) => i.vendorId === v.id && i.timestamp >= monthStart);
    const orders = myInts.filter((i) => i.status === "ordered" && i.channel === "call").length;
    const calls = myInts.filter((i) => i.channel === "call").length;
    return { vendor: v, goal, orders, calls };
  }).filter((s) => s.goal.ordersGoal > 0 || s.goal.callsGoal > 0);

  if (stats.length === 0) {
    return <div className="text-center py-6 text-stone-400 text-sm italic">{t.quotasSub}</div>;
  }

  return (
    <div className="space-y-2">
      {stats.map(({ vendor, goal, orders, calls }) => {
        const ordersPct = goal.ordersGoal > 0 ? Math.min(100, (orders / goal.ordersGoal) * 100) : 0;
        const callsPct = goal.callsGoal > 0 ? Math.min(100, (calls / goal.callsGoal) * 100) : 0;
        return (
          <div key={vendor.id} className="bg-white rounded-2xl p-3 card-shadow">
            <div className="font-medium text-sm mb-2">{vendor.name}</div>
            {goal.ordersGoal > 0 && (
              <div className="mb-2">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-stone-600">{t.ordersDone(orders, goal.ordersGoal)}</span>
                  <span className="font-semibold" style={{ color: ordersPct >= 100 ? "#73A626" : ordersPct >= 60 ? BRAND_PURPLE : "#9C5757" }}>{Math.round(ordersPct)}%</span>
                </div>
                <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full transition-all" style={{ width: `${ordersPct}%`, background: ordersPct >= 100 ? "#73A626" : BRAND_PURPLE }} />
                </div>
              </div>
            )}
            {goal.callsGoal > 0 && (
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-stone-600">{t.callsDone(calls, goal.callsGoal)}</span>
                  <span className="font-semibold" style={{ color: callsPct >= 100 ? "#73A626" : callsPct >= 60 ? "#5A6B85" : "#9C5757" }}>{Math.round(callsPct)}%</span>
                </div>
                <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full transition-all" style={{ width: `${callsPct}%`, background: callsPct >= 100 ? "#73A626" : "#5A6B85" }} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="bg-white rounded-2xl p-4 card-shadow">
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{label}</div>
      <div className="display text-3xl" style={{ color: accent }}>{value}</div>
    </div>
  );
}

// ---------- CALL OUTCOMES BREAKDOWN ----------
// Shows the breakdown of call statuses (orders, callbacks, no-answers, etc.)
// so the manager understands the QUALITY of activity, not just the quantity.
function CallOutcomesBreakdown({ t, totalCalls, orders, callbacks, noAnswers, priceIssues, notInterested, other }) {
  const rows = [
    { key: "ordered", label: t.statusOrdered, count: orders, color: "#73A626", bg: "#E8F2D5" },
    { key: "callback", label: t.statusCallback, count: callbacks, color: "#5A6B85", bg: "#E5EAF2" },
    { key: "no_answer", label: t.statusNoAnswer, count: noAnswers, color: "#8B7355", bg: "#F0EAE0" },
    { key: "price_issue", label: t.statusPriceIssue, count: priceIssues, color: "#B8860B", bg: "#FFF5D6" },
    { key: "not_interested", label: t.statusNotInterested, count: notInterested, color: "#9C5757", bg: "#F2E2E2" },
    { key: "other", label: t.statusOther || "Other", count: other, color: "#5A4A6B", bg: "#EAE3F0" },
  ].filter((r) => r.count > 0);

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] uppercase tracking-widest text-stone-500">{t.callOutcomes || "Call outcomes"}</div>
        <div className="text-[11px] text-stone-400">{totalCalls} {t.callOutcomesTotal || "total calls"}</div>
      </div>
      <div className="space-y-2">
        {rows.map((r) => {
          const pct = totalCalls > 0 ? (r.count / totalCalls) * 100 : 0;
          return (
            <div key={r.key}>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-medium" style={{ color: r.color }}>{r.label}</div>
                <div className="text-[11px]">
                  <span className="font-semibold" style={{ color: r.color }}>{r.count}</span>
                  <span className="text-stone-400 ml-1">({Math.round(pct)}%)</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: r.bg }}>
                <div className="h-full transition-all" style={{ width: `${pct}%`, background: r.color }} />
              </div>
            </div>
          );
        })}
      </div>
      {callbacks > 0 && (
        <div className="mt-3 pt-3 text-[11px] flex items-start gap-1.5" style={{ borderTop: "1px solid rgba(28,27,26,0.06)", color: "#5A6B85" }}>
          <Clock size={11} className="mt-0.5 flex-shrink-0" />
          <span>{callbacks === 1 ? `1 ${t.callbackPending || "pending callback"}` : `${callbacks} ${t.callbacksPending || "pending callbacks"}`}</span>
        </div>
      )}
    </div>
  );
}

function VendorLiveCard({ t, stat, rank, clients, onPillClick }) {
  const { vendor, contacted, myClients, orders, callbacks, noAnswers, priceIssues, notInterested, otherStatus, textInts, emailInts, textedIds, emailedIds, rate } = stat;
  const ordersCount = orders.length;
  const callbacksCount = callbacks ? callbacks.length : 0;
  const noAnswersCount = noAnswers ? noAnswers.length : 0;
  const priceIssuesCount = priceIssues ? priceIssues.length : 0;
  const notInterestedCount = notInterested ? notInterested.length : 0;
  const otherCount = otherStatus ? otherStatus.length : 0;

  function handlePillClick(category, items, label, color, bg) {
    if (!onPillClick) return;
    if (!items || items.length === 0) return; // nothing to show
    onPillClick({ vendor, category, items, label, color, bg, clients });
  }

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium" style={{ background: rank === 1 ? "#1C1B1A" : "#F0EAE0", color: rank === 1 ? "#F5F1EA" : "#8B7355" }}>{rank}</div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm truncate">{vendor.name}</div>
            <div className="text-[10px] text-stone-400 mt-0.5">{contacted.length}/{myClients.length} {t.contactedShort || "contacted"}</div>
          </div>
        </div>
        <div className="text-xs font-medium flex-shrink-0" style={{ color: "#73A626" }}>{Math.round(rate * 100)}%</div>
      </div>

      <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden mb-3">
        <div className="h-full transition-all" style={{ width: `${rate * 100}%`, background: "#73A626" }} />
      </div>

      {/* Row 1: Call results */}
      <div className="grid grid-cols-4 gap-1.5 mb-1.5">
        <VendorStatPill icon={CheckCircle2} value={ordersCount} label={t.statusOrdered} color="#73A626" bg="#E8F2D5"
          onClick={() => handlePillClick("ordered", orders, t.statusOrdered, "#73A626", "#E8F2D5")} />
        <VendorStatPill icon={Clock} value={callbacksCount} label={t.statusCallback} color="#5A6B85" bg="#E5EAF2"
          onClick={() => handlePillClick("callback", callbacks, t.statusCallback, "#5A6B85", "#E5EAF2")} />
        <VendorStatPill icon={PhoneOff} value={noAnswersCount} label={t.statusNoAnswer} color="#8B7355" bg="#F0EAE0"
          onClick={() => handlePillClick("no_answer", noAnswers, t.statusNoAnswer, "#8B7355", "#F0EAE0")} />
        <VendorStatPill icon={XCircle} value={notInterestedCount} label={t.statusNotInterested} color="#9C5757" bg="#F2E2E2"
          onClick={() => handlePillClick("not_interested", notInterested, t.statusNotInterested, "#9C5757", "#F2E2E2")} />
      </div>
      {/* Row 2: Other contacts + edge cases */}
      <div className="grid grid-cols-3 gap-1.5">
        <VendorStatPill icon={DollarSign} value={priceIssuesCount} label={t.statusPriceIssue} color="#B8860B" bg="#FFF5D6"
          onClick={() => handlePillClick("price_issue", priceIssues, t.statusPriceIssue, "#B8860B", "#FFF5D6")} />
        <VendorStatPill icon={MessageCircle} value={textedIds.size} label={t.textChannel} color="#1C5E6E" bg="#D7EDF1"
          onClick={() => handlePillClick("text", textInts || [], t.textChannel, "#1C5E6E", "#D7EDF1")} />
        <VendorStatPill icon={Mail} value={emailedIds.size} label={t.emailChannel} color="#5A4A6B" bg="#EAE3F0"
          onClick={() => handlePillClick("email", emailInts || [], t.emailChannel, "#5A4A6B", "#EAE3F0")} />
      </div>
    </div>
  );
}

function VendorStatPill({ icon: Icon, value, label, color, bg, onClick }) {
  const isClickable = !!onClick && value > 0;
  return (
    <button
      onClick={isClickable ? onClick : undefined}
      disabled={!isClickable}
      className={`rounded-lg p-2 flex flex-col items-center justify-center text-center transition-all ${isClickable ? "hover:scale-105 cursor-pointer" : "cursor-default"}`}
      style={{ background: bg, opacity: value === 0 ? 0.5 : 1 }}
    >
      <div className="flex items-center gap-1 mb-0.5">
        <Icon size={10} style={{ color }} />
        <span className="text-sm font-bold" style={{ color }}>{value}</span>
      </div>
      <div className="text-[9px] uppercase tracking-wide truncate w-full" style={{ color }}>{label}</div>
    </button>
  );
}

// Modal showing detailed list of clients for a specific call outcome category
function VendorOutcomeModal({ t, data, onClose }) {
  if (!data) return null;
  const { vendor, category, items, label, color, bg, clients } = data;

  // Sort by timestamp descending
  const sortedItems = [...(items || [])].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  function getClientName(clientId) {
    const c = (clients || []).find((cc) => cc.id === clientId);
    return c?.name || t.unknownClient || "Unknown client";
  }

  function formatTime(ts) {
    if (!ts) return "";
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-2" style={{ borderBottom: "1px solid rgba(28,27,26,0.06)" }}>
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
              <span className="text-sm font-bold" style={{ color }}>{items.length}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm" style={{ color }}>{label}</div>
              <div className="text-xs text-stone-500 truncate">{vendor.name}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 p-1 flex-shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {sortedItems.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-sm italic">{t.noActivityYet || "No activity yet"}</div>
          ) : (
            sortedItems.map((item, idx) => (
              <div key={item.id || idx} className="rounded-lg p-3" style={{ background: bg }}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="font-medium text-sm" style={{ color }}>
                    {getClientName(item.clientId)}
                  </div>
                  <div className="text-[11px] flex-shrink-0" style={{ color, opacity: 0.7 }}>
                    {formatTime(item.timestamp)}
                  </div>
                </div>
                {/* Scheduled time for callbacks */}
                {item.scheduledTime && (
                  <div className="text-[11px] flex items-center gap-1 mb-1" style={{ color, opacity: 0.85 }}>
                    <Clock size={10} /> {t.scheduledFor || "Scheduled"}: {item.scheduledTime}
                  </div>
                )}
                {/* Sub-reason for not_interested */}
                {item.subReason && item.subReason !== "other_reason" && (
                  <div className="text-[11px] mb-1" style={{ color, opacity: 0.85 }}>
                    {reasonLabel(item.subReason, t)}
                  </div>
                )}
                {/* Note */}
                {item.note && (
                  <div className="text-[11px] italic" style={{ color, opacity: 0.85 }}>
                    "{item.note}"
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


function ReportCard({ t, stat }) {
  const { vendor, contacted, pending, callInts, textedIds, emailedIds, orders } = stat;
  return (
    <div className="bg-white rounded-2xl p-5 card-shadow">
      <div className="flex items-baseline justify-between mb-3">
        <div className="display text-xl">{vendor.name}</div>
        <div className="text-xs text-stone-500 flex gap-2">
          <span>{orders.length} {t.ordersWord}</span>
          <span>· <MessageCircle size={9} className="inline" /> {textedIds.size}</span>
          <span>· <Mail size={9} className="inline" /> {emailedIds.size}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1" style={{ color: "#73A626" }}>
          <CheckCircle2 size={11} /> {t.contacted} ({contacted.length})
        </div>
        <div className="space-y-1.5">
          {contacted.length === 0 ? (<div className="text-xs text-stone-400 italic">{t.noneContactedYet}</div>) : (
            contacted.map((c) => {
              const last = callInts.filter((i) => i.clientId === c.id).slice(-1)[0];
              const s = STATUS_META[last.status];
              let detail = statusLabel(last.status, t);
              if (last.status === "callback" && last.scheduledTime) detail += ` ${last.scheduledTime}`;
              else if (last.status === "not_interested" && last.subReason) {
                detail += " — " + (last.subReason === "other_reason" && last.note ? last.note : reasonLabel(last.subReason, t));
              } else if (last.note) detail += ` · ${last.note}`;
              return (
                <div key={c.id} className="flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    <span className="truncate">{c.name}</span>
                    <div className="flex gap-1 flex-shrink-0">
                      {textedIds.has(c.id) && <MessageCircle size={9} style={{ color: "#1C5E6E" }} />}
                      {emailedIds.has(c.id) && <Mail size={9} style={{ color: "#5A4A6B" }} />}
                    </div>
                  </div>
                  <span className="text-stone-500 flex-shrink-0 truncate max-w-[55%] text-right">{detail}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1" style={{ color: "#9C5757" }}>
          <AlertCircle size={11} /> {t.notContacted} ({pending.length})
        </div>
        <div className="space-y-1.5">
          {pending.length === 0 ? (<div className="text-xs text-stone-400 italic">{t.allContacted}</div>) : (
            pending.map((c) => (
              <div key={c.id} className="flex items-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#9C5757" }} />
                <span className="truncate flex-1">{c.name}</span>
                <div className="flex gap-1 flex-shrink-0">
                  {textedIds.has(c.id) && <MessageCircle size={9} style={{ color: "#1C5E6E" }} />}
                  {emailedIds.has(c.id) && <Mail size={9} style={{ color: "#5A4A6B" }} />}
                </div>
                <span className="text-stone-400 flex-shrink-0">· {freqLabel(c.frequency, t)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function FrequencyBars({ stats }) {
  const max = Math.max(...stats.map((s) => s.callInts.length + s.textInts.length + s.emailInts.length), 1);
  return (
    <div className="space-y-2.5">
      {stats.map((s) => {
        const total = s.callInts.length + s.textInts.length + s.emailInts.length;
        const w = (total / max) * 100;
        return (
          <div key={s.vendor.id} className="flex items-center gap-3">
            <div className="text-xs w-20 truncate text-stone-700">{s.vendor.name}</div>
            <div className="flex-1 h-5 bg-stone-100 rounded relative overflow-hidden">
              <div className="h-full transition-all flex items-center justify-end pr-2 text-[10px] font-medium text-white" style={{ width: `${w}%`, background: "#1C1B1A", minWidth: total > 0 ? "24px" : 0 }}>
                {total > 0 ? total : ""}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- REPORTS / RANKING COMPONENTS ----------
function PeriodTabs({ value, onChange, options, t }) {
  return (
    <div className="flex gap-1 mb-5 bg-white rounded-2xl p-1 card-shadow">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className="flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-all"
          style={{
            background: value === opt.key ? "#5F2F9D" : "transparent",
            color: value === opt.key ? "#F5F1EA" : "#8B7355",
          }}
        >
          {t[opt.labelKey]}
        </button>
      ))}
    </div>
  );
}

function BestSellerCard({ t, top }) {
  return (
    <div className="rounded-2xl p-5 card-shadow mb-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #5F2F9D 0%, #844ECA 100%)", color: "#F5F1EA" }}>
      <div className="absolute -top-8 -right-8 opacity-15">
        <Award size={120} style={{ color: "#FFED13" }} />
      </div>
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,237,19,0.22)" }}>
            <Award size={22} style={{ color: "#FFED13" }} />
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">{t.bestSeller}</div>
            <div className="display text-2xl">{top.vendor.name}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-3" style={{ borderTop: "1px solid rgba(245,241,234,0.18)" }}>
          <div>
            <div className="text-[10px] uppercase tracking-widest opacity-70">{t.recurrentClients}</div>
            <div className="display text-2xl mt-0.5" style={{ color: "#FFED13" }}>{top.recurrentCount}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest opacity-70">{t.orders}</div>
            <div className="display text-2xl mt-0.5">{top.orders.length}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest opacity-70">{t.contactRate}</div>
            <div className="display text-2xl mt-0.5">{Math.round(top.recurrentRate * 100)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecurrentClientsRanking({ t, ranking }) {
  const max = Math.max(...ranking.map((r) => r.recurrentCount), 1);
  return (
    <div className="space-y-3">
      {ranking.map((r, idx) => {
        const isTop = idx === 0 && r.recurrentCount > 0;
        return (
          <div key={r.vendor.id} className="bg-white rounded-2xl p-4 card-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ background: isTop ? "#FFED13" : "#F0EAE0", color: "#1C1B1A" }}>
                  {idx + 1}
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{r.vendor.name}</div>
                  <div className="text-xs text-stone-500">
                    {r.orders.length} {t.ordersWord} · {r.myClients.length} {t.clientsTab.toLowerCase()}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="display text-2xl leading-none" style={{ color: isTop ? "#5F2F9D" : "#73A626" }}>{r.recurrentCount}</div>
                <div className="text-[9px] text-stone-500 uppercase tracking-wider mt-0.5">{t.recurrentClients}</div>
              </div>
            </div>
            <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full transition-all" style={{ width: `${(r.recurrentCount / max) * 100}%`, background: isTop ? "#FFED13" : "#73A626" }} />
            </div>
            {r.recurrentList.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1">
                {r.recurrentList.slice(0, 5).map((rc) => (
                  <div key={rc.client.id} className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    {rc.client.name} <span className="font-medium" style={{ color: "#73A626" }}>×{rc.count}</span>
                  </div>
                ))}
                {r.recurrentList.length > 5 && (
                  <div className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
                    +{r.recurrentList.length - 5}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ClientRankingList({ t, stats }) {
  if (!stats.length) return null;
  const max = Math.max(...stats.map((s) => s.orders), 1);
  return (
    <div className="space-y-2">
      {stats.map((s, idx) => {
        const isTop = idx === 0 && s.orders > 0;
        const isInactive = s.orders === 0 && s.contacts === 0;
        return (
          <div key={s.client.id} className="bg-white rounded-xl p-3 card-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0" style={{
                background: isTop ? "#FFED13" : isInactive ? "#F2E2E2" : "#F0EAE0",
                color: "#1C1B1A",
              }}>
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate flex items-center gap-1.5">
                  {isTop && <Award size={11} style={{ color: "#5F2F9D" }} />}
                  {s.client.name}
                </div>
                <div className="text-[11px] text-stone-500">
                  {isInactive ? t.inactiveClient : `${s.contacts} ${t.contactsWord} · ${s.orders} ${t.ordersWord}`}
                </div>
              </div>
              <div className="display text-lg font-medium flex-shrink-0" style={{ color: s.orders > 0 ? (isTop ? "#5F2F9D" : "#73A626") : "#9C5757" }}>
                {s.orders}
              </div>
            </div>
            <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full transition-all" style={{
                width: `${(s.orders / max) * 100}%`,
                background: s.orders > 0 ? (isTop ? "#FFED13" : "#73A626") : "#D6D6D6",
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RepClientRankings({ t, stats }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="space-y-2">
      {stats.map((s) => {
        const clientStats = s.myClients.map((c) => {
          const cInts = s.callInts.filter((i) => i.clientId === c.id);
          return {
            client: c,
            orders: cInts.filter((i) => i.status === "ordered").length,
            contacts: cInts.length,
          };
        });
        const sorted = clientStats.slice().sort((a, b) => b.orders - a.orders || b.contacts - a.contacts);
        const best = sorted.filter((c) => c.orders > 0).slice(0, 3);
        const worst = sorted.filter((c) => c.contacts > 0 && c.orders === 0).sort((a, b) => b.contacts - a.contacts).slice(0, 3);
        const isOpen = expandedId === s.vendor.id;
        const hasData = best.length > 0 || worst.length > 0;
        const maxBest = Math.max(...best.map((b) => b.orders), 1);

        return (
          <div key={s.vendor.id} className="bg-white rounded-2xl card-shadow overflow-hidden">
            <button
              onClick={() => hasData && setExpandedId(isOpen ? null : s.vendor.id)}
              className="w-full p-3 flex items-center justify-between text-left transition-colors hover:bg-stone-50"
              disabled={!hasData}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <Award size={14} style={{ color: best.length > 0 ? "#5F2F9D" : "#A8A29E" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{s.vendor.name}</div>
                  <div className="text-[11px] text-stone-500 truncate">
                    {best[0] ? (
                      <>{t.bestClients.toLowerCase()}: {best[0].client.name} · {best[0].orders} {t.ordersWord}</>
                    ) : (
                      <span className="italic">{t.noActivity}</span>
                    )}
                  </div>
                </div>
              </div>
              {hasData && (
                <ChevronRight size={14} className={`text-stone-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-90" : ""}`} />
              )}
            </button>
            {isOpen && hasData && (
              <div className="px-3 pb-3 pt-0 space-y-3" style={{ borderTop: "1px solid rgba(28,27,26,0.06)" }}>
                {best.length > 0 && (
                  <div className="pt-3">
                    <div className="text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1" style={{ color: "#73A626" }}>
                      <Award size={10} /> {t.bestClients}
                    </div>
                    <div className="space-y-1.5">
                      {best.map((b, idx) => (
                        <div key={b.client.id} className="flex items-center gap-2">
                          <div className="text-[10px] w-3 text-stone-500 flex-shrink-0">{idx + 1}</div>
                          <div className="text-xs truncate flex-1">{b.client.name}</div>
                          <div className="bg-stone-100 h-1.5 w-16 rounded-full overflow-hidden flex-shrink-0">
                            <div className="h-full" style={{ width: `${(b.orders / maxBest) * 100}%`, background: idx === 0 ? "#5F2F9D" : "#73A626" }} />
                          </div>
                          <div className="text-xs font-semibold w-5 text-right flex-shrink-0" style={{ color: idx === 0 ? "#5F2F9D" : "#73A626" }}>{b.orders}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {worst.length > 0 && (
                  <div>
                    <div className="text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1" style={{ color: "#9C5757" }}>
                      <AlertCircle size={10} /> {t.worstClients}
                    </div>
                    <div className="space-y-1.5">
                      {worst.map((w, idx) => (
                        <div key={w.client.id} className="flex items-center gap-2">
                          <div className="text-[10px] w-3 text-stone-500 flex-shrink-0">{idx + 1}</div>
                          <div className="text-xs truncate flex-1">{w.client.name}</div>
                          <div className="text-[10px] text-stone-500 flex-shrink-0">
                            {w.contacts} {t.contactsWord} · 0 {t.ordersWord}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------- ANALYTICS / GROWTH ----------

const PERIOD_OPTIONS = [
  { key: "30d", days: 30, labelKey: "period30" },
  { key: "60d", days: 60, labelKey: "period60" },
  { key: "90d", days: 90, labelKey: "period90" },
];

function GrowthPeriodTabs({ t, value, onChange }) {
  return (
    <div className="flex gap-1 mb-4 bg-white rounded-2xl p-1 card-shadow">
      {PERIOD_OPTIONS.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-medium transition-all ${value === opt.key ? "text-white" : "text-stone-600"}`}
          style={{ background: value === opt.key ? BRAND_PURPLE : "transparent" }}
        >
          {t[opt.labelKey]}
        </button>
      ))}
    </div>
  );
}

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth(date) {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Bucket interactions by week or month
function bucketByPeriod(interactions, periodType, numBuckets) {
  const buckets = [];
  const now = new Date();

  for (let i = numBuckets - 1; i >= 0; i--) {
    let start, end, label;
    if (periodType === "week") {
      start = startOfWeek(new Date(now.getTime() - i * 7 * 24 * 3600 * 1000));
      end = new Date(start.getTime() + 7 * 24 * 3600 * 1000);
      const weekNum = Math.ceil(((start - new Date(start.getFullYear(), 0, 1)) / 86400000 + new Date(start.getFullYear(), 0, 1).getDay() + 1) / 7);
      label = `W${weekNum}`;
    } else {
      // month
      const target = new Date(now.getFullYear(), now.getMonth() - i, 1);
      start = startOfMonth(target);
      end = new Date(target.getFullYear(), target.getMonth() + 1, 1);
      label = start.toLocaleDateString("en", { month: "short" });
    }
    buckets.push({ start, end, label, count: 0 });
  }

  interactions.forEach((int) => {
    const ts = int.timestamp;
    for (const b of buckets) {
      if (ts >= b.start.getTime() && ts < b.end.getTime()) {
        b.count++;
        break;
      }
    }
  });
  return buckets;
}

function BarChart({ buckets, color = BRAND_PURPLE }) {
  const max = Math.max(...buckets.map((b) => b.count), 1);
  return (
    <div className="bg-white rounded-2xl p-4 card-shadow">
      <div className="flex items-end gap-1.5 h-32">
        {buckets.map((b, i) => {
          const heightPct = (b.count / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1 min-w-0">
              <div className="text-[9px] font-semibold text-stone-700 leading-none">{b.count > 0 ? b.count : ""}</div>
              <div
                className="w-full rounded-t-sm transition-all"
                style={{
                  height: `${Math.max(heightPct, b.count > 0 ? 4 : 0)}%`,
                  background: color,
                  opacity: 0.7 + (heightPct / 100) * 0.3,
                  minHeight: b.count > 0 ? "4px" : "0",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-1.5 mt-2">
        {buckets.map((b, i) => (
          <div key={i} className="flex-1 text-[9px] text-stone-500 text-center truncate">
            {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChart({ buckets, color = BRAND_PURPLE }) {
  const max = Math.max(...buckets.map((b) => b.value), 1);
  const w = 280, h = 100;
  const stepX = buckets.length > 1 ? w / (buckets.length - 1) : 0;
  const points = buckets.map((b, i) => {
    const x = i * stepX;
    const y = h - (b.value / max) * (h - 10) - 5;
    return { x, y, value: b.value, label: b.label };
  });
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const areaD = pathD + ` L ${points[points.length - 1]?.x.toFixed(1) || 0} ${h} L 0 ${h} Z`;

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow">
      <svg viewBox={`0 0 ${w} ${h + 20}`} className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#lineGradient)" />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="white" stroke={color} strokeWidth="1.5" />
        ))}
        {points.map((p, i) => (
          <text key={`l-${i}`} x={p.x} y={h + 13} textAnchor="middle" fontSize="8" fill="#78716C">
            {p.label}
          </text>
        ))}
      </svg>
      <div className="flex items-center justify-between mt-1 text-[10px] text-stone-500">
        <span>{buckets[0]?.label}</span>
        <span className="font-semibold" style={{ color }}>{buckets[buckets.length - 1]?.value || 0}</span>
      </div>
    </div>
  );
}

function ComparisonCard({ t, label, current, previous, vsLabel, color = BRAND_PURPLE }) {
  const change = current - previous;
  const pct = previous > 0 ? Math.round((change / previous) * 100) : (current > 0 ? 100 : 0);
  const positive = change > 0;
  const neutral = change === 0;

  return (
    <div className="bg-white rounded-2xl p-3 card-shadow">
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{label}</div>
      <div className="display text-3xl mb-1" style={{ color }}>{current}</div>
      <div className="flex items-center gap-1 text-[10px]">
        {neutral ? (
          <span className="text-stone-400">— {vsLabel}</span>
        ) : (
          <>
            <span className="font-semibold" style={{ color: positive ? "#2D5A3D" : "#9C5757" }}>
              {positive ? "↑" : "↓"} {Math.abs(pct)}%
            </span>
            <span className="text-stone-400 truncate">{vsLabel}</span>
          </>
        )}
      </div>
    </div>
  );
}

function VendorGrowth({ t, vendorId, leads, clients, interactions }) {
  const [period, setPeriod] = useState("30d");
  const [historical, setHistorical] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const opt = PERIOD_OPTIONS.find((p) => p.key === period);
    loadInteractionsForDays(opt.days, true).then((hist) => {
      setHistorical(hist);
      setLoading(false);
    });
  }, [period]);

  const allInts = useMemo(() => [...historical, ...interactions], [historical, interactions]);
  const myInts = useMemo(() => allInts.filter((i) => i.vendorId === vendorId), [allInts, vendorId]);
  const myOrders = useMemo(() => myInts.filter((i) => i.status === "ordered" && i.channel === "call"), [myInts]);
  const myLeads = useMemo(() => leads.filter((l) => l.assignedVendorId === vendorId || (l.createdBy === `vendor:${vendorId}` && l.status === "pending")), [leads, vendorId]);
  const myConvertedLeads = useMemo(() => leads.filter((l) => l.assignedVendorId === vendorId && l.status === "converted"), [leads, vendorId]);

  // Comparison metrics
  const now = Date.now();
  const oneWeek = 7 * 24 * 3600 * 1000;
  const oneMonth = 30 * 24 * 3600 * 1000;

  const ordersThisWeek = myOrders.filter((i) => i.timestamp >= now - oneWeek).length;
  const ordersLastWeek = myOrders.filter((i) => i.timestamp >= now - 2 * oneWeek && i.timestamp < now - oneWeek).length;
  const ordersThisMonth = myOrders.filter((i) => i.timestamp >= now - oneMonth).length;
  const ordersLastMonth = myOrders.filter((i) => i.timestamp >= now - 2 * oneMonth && i.timestamp < now - oneMonth).length;

  const newCustomersThisMonth = myConvertedLeads.filter((l) => l.convertedAt >= now - oneMonth).length;
  const newCustomersLastMonth = myConvertedLeads.filter((l) => l.convertedAt >= now - 2 * oneMonth && l.convertedAt < now - oneMonth).length;

  const newLeadsThisWeek = myLeads.filter((l) => l.createdAt >= now - oneWeek).length;
  const newLeadsLastWeek = myLeads.filter((l) => l.createdAt >= now - 2 * oneWeek && l.createdAt < now - oneWeek).length;

  // Bucket data
  const opt = PERIOD_OPTIONS.find((p) => p.key === period);
  const numWeeks = Math.min(Math.ceil(opt.days / 7), 12);
  const numMonths = Math.min(Math.ceil(opt.days / 30), 12);

  const ordersByWeek = useMemo(() => bucketByPeriod(myOrders, "week", numWeeks), [myOrders, numWeeks]);
  const ordersByMonth = useMemo(() => bucketByPeriod(myOrders, "month", numMonths), [myOrders, numMonths]);

  // Cumulative customer growth (by month)
  const cumulativeCustomers = useMemo(() => {
    const buckets = bucketByPeriod(
      myConvertedLeads.map((l) => ({ timestamp: l.convertedAt })).filter((x) => x.timestamp),
      "month",
      numMonths
    );
    let running = 0;
    return buckets.map((b) => {
      running += b.count;
      return { ...b, value: running };
    });
  }, [myConvertedLeads, numMonths]);

  // Conversion rate
  const totalLeads = leads.filter((l) => l.assignedVendorId === vendorId).length;
  const convertedCount = myConvertedLeads.length;
  const convPct = totalLeads > 0 ? Math.round((convertedCount / totalLeads) * 100) : 0;

  if (loading) {
    return <div className="text-center py-8 text-stone-400 text-sm display">{t.growthLoading}</div>;
  }

  return (
    <div>
      <GrowthPeriodTabs t={t} value={period} onChange={setPeriod} />

      {/* Comparison cards */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <ComparisonCard t={t} label={t.thisWeek + " · " + t.orders} current={ordersThisWeek} previous={ordersLastWeek} vsLabel={t.vsLastWeek} color="#2D5A3D" />
        <ComparisonCard t={t} label={t.thisMonth + " · " + t.orders} current={ordersThisMonth} previous={ordersLastMonth} vsLabel={t.vsLastMonth} color="#2D5A3D" />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-5">
        <ComparisonCard t={t} label={t.newCustomers} current={newCustomersThisMonth} previous={newCustomersLastMonth} vsLabel={t.vsLastMonth} color={BRAND_PURPLE} />
        <ComparisonCard t={t} label={t.newLeadsLabel} current={newLeadsThisWeek} previous={newLeadsLastWeek} vsLabel={t.vsLastWeek} color="#8B6F1A" />
      </div>

      {/* Conversion rate */}
      {totalLeads > 0 && (
        <div className="bg-white rounded-2xl p-4 card-shadow mb-5">
          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">{t.conversionRate}</div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="display text-3xl" style={{ color: BRAND_PURPLE }}>{convPct}%</div>
            <div className="text-xs text-stone-500">{t.conversionRateSub(convertedCount, totalLeads)}</div>
          </div>
          <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full" style={{ width: `${convPct}%`, background: BRAND_PURPLE }} />
          </div>
        </div>
      )}

      {/* Orders per week */}
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">{t.ordersPerWeek}</div>
      <div className="mb-5">
        <BarChart buckets={ordersByWeek} color="#2D5A3D" />
      </div>

      {/* Orders per month */}
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">{t.ordersPerMonth}</div>
      <div className="mb-5">
        <BarChart buckets={ordersByMonth} color={BRAND_PURPLE} />
      </div>

      {/* Cumulative customer growth */}
      {cumulativeCustomers.some((b) => b.value > 0) && (
        <>
          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">{t.cumulativeCustomers}</div>
          <div className="mb-2">
            <LineChart buckets={cumulativeCustomers} color={BRAND_PURPLE} />
          </div>
        </>
      )}
    </div>
  );
}

// Manager: Lead conversion leaderboard + analytics
function ManagerConversionAnalytics({ t, vendors, clients, leads, interactions }) {
  const [period, setPeriod] = useState("30d");
  const [historical, setHistorical] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const opt = PERIOD_OPTIONS.find((p) => p.key === period);
    loadInteractionsForDays(opt.days, true).then((hist) => {
      setHistorical(hist);
      setLoading(false);
    });
  }, [period]);

  const allInts = useMemo(() => [...historical, ...interactions], [historical, interactions]);
  const opt = PERIOD_OPTIONS.find((p) => p.key === period);
  const cutoff = Date.now() - opt.days * 24 * 3600 * 1000;

  // Conversion stats per vendor
  const conversionStats = useMemo(() => {
    return vendors.map((v) => {
      const myConverted = leads.filter((l) => l.assignedVendorId === v.id && l.status === "converted" && (l.convertedAt || 0) >= cutoff);
      const myActiveCustomers = clients.filter((c) => c.vendorId === v.id);
      const myInts = allInts.filter((i) => i.vendorId === v.id);
      const myOrders = myInts.filter((i) => i.status === "ordered" && i.channel === "call");
      // Recurrent orders: clients with 2+ orders in period
      const ordersByClient = {};
      myOrders.forEach((o) => { ordersByClient[o.clientId] = (ordersByClient[o.clientId] || 0) + 1; });
      const recurrentClients = Object.entries(ordersByClient).filter(([_, n]) => n >= 2).length;
      return {
        vendor: v,
        converted: myConverted.length,
        activeCustomers: myActiveCustomers.length,
        recurrentClients,
        totalOrders: myOrders.length,
      };
    });
  }, [vendors, leads, clients, allInts, cutoff]);

  // Star customer (most orders in period across all vendors)
  const starCustomer = useMemo(() => {
    const ordersByClient = {};
    allInts.forEach((i) => {
      if (i.status === "ordered" && i.channel === "call") {
        ordersByClient[i.clientId] = (ordersByClient[i.clientId] || 0) + 1;
      }
    });
    const top = Object.entries(ordersByClient).sort((a, b) => b[1] - a[1])[0];
    if (!top) return null;
    const client = clients.find((c) => c.id === top[0]);
    if (!client) return null;
    const vendor = vendors.find((v) => v.id === client.vendorId);
    return { client, vendor, orderCount: top[1] };
  }, [allInts, clients, vendors]);

  if (loading) {
    return <div className="text-center py-8 text-stone-400 text-sm display">{t.growthLoading}</div>;
  }

  const sortedConv = conversionStats.slice().sort((a, b) => b.converted - a.converted);
  const sortedActive = conversionStats.slice().sort((a, b) => b.activeCustomers - a.activeCustomers);
  const sortedRecurrent = conversionStats.slice().sort((a, b) => b.recurrentClients - a.recurrentClients);
  const maxConv = Math.max(...sortedConv.map((s) => s.converted), 1);
  const maxActive = Math.max(...sortedActive.map((s) => s.activeCustomers), 1);
  const maxRecurrent = Math.max(...sortedRecurrent.map((s) => s.recurrentClients), 1);

  return (
    <div>
      <GrowthPeriodTabs t={t} value={period} onChange={setPeriod} />

      {/* Star customer */}
      {starCustomer && (
        <div className="rounded-2xl p-4 card-shadow mb-5" style={{ background: "#1C1B1A", color: "#F5F1EA" }}>
          <div className="flex items-center gap-2 mb-2">
            <Award size={14} style={{ color: "#FFD700" }} />
            <div className="text-[10px] uppercase tracking-widest opacity-70">{t.starCustomer}</div>
          </div>
          <div className="display text-2xl mb-0.5">{starCustomer.client.name}</div>
          <div className="text-xs opacity-70">
            {starCustomer.orderCount} {t.ordersWord} · {starCustomer.vendor?.name || "—"}
          </div>
          <div className="text-[10px] opacity-50 mt-1">{t.starCustomerSub}</div>
        </div>
      )}

      {/* Leads converted leaderboard */}
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2 flex items-center gap-1">
        <UserPlus size={10} /> {t.leadsConverted}
      </div>
      <div className="bg-white rounded-2xl p-4 card-shadow mb-5">
        <div className="space-y-2.5">
          {sortedConv.map((s, idx) => (
            <div key={s.vendor.id} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0" style={{ background: idx === 0 ? "#1C1B1A" : "#F0EAE0", color: idx === 0 ? "#FFD700" : "#8B7355" }}>
                {idx + 1}
              </div>
              <div className="text-xs w-20 truncate text-stone-700 flex-shrink-0">{s.vendor.name}</div>
              <div className="flex-1 h-4 bg-stone-100 rounded relative overflow-hidden">
                <div className="h-full transition-all flex items-center justify-end pr-1.5 text-[9px] font-semibold text-white" style={{ width: `${(s.converted / maxConv) * 100}%`, background: BRAND_PURPLE, minWidth: s.converted > 0 ? "20px" : 0 }}>
                  {s.converted > 0 ? s.converted : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active customers leaderboard */}
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2 flex items-center gap-1">
        <Users size={10} /> {t.activeCustomers}
      </div>
      <div className="bg-white rounded-2xl p-4 card-shadow mb-5">
        <div className="space-y-2.5">
          {sortedActive.map((s, idx) => (
            <div key={s.vendor.id} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0" style={{ background: idx === 0 ? "#1C1B1A" : "#F0EAE0", color: idx === 0 ? "#FFD700" : "#8B7355" }}>
                {idx + 1}
              </div>
              <div className="text-xs w-20 truncate text-stone-700 flex-shrink-0">{s.vendor.name}</div>
              <div className="flex-1 h-4 bg-stone-100 rounded relative overflow-hidden">
                <div className="h-full transition-all flex items-center justify-end pr-1.5 text-[9px] font-semibold text-white" style={{ width: `${(s.activeCustomers / maxActive) * 100}%`, background: "#2D5A3D", minWidth: s.activeCustomers > 0 ? "20px" : 0 }}>
                  {s.activeCustomers > 0 ? s.activeCustomers : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recurrent leaderboard */}
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2 flex items-center gap-1">
        <TrendingUp size={10} /> {t.recurrentRanking}
      </div>
      <div className="bg-white rounded-2xl p-4 card-shadow">
        <div className="space-y-2.5">
          {sortedRecurrent.map((s, idx) => (
            <div key={s.vendor.id} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0" style={{ background: idx === 0 ? "#1C1B1A" : "#F0EAE0", color: idx === 0 ? "#FFD700" : "#8B7355" }}>
                {idx + 1}
              </div>
              <div className="text-xs w-20 truncate text-stone-700 flex-shrink-0">{s.vendor.name}</div>
              <div className="flex-1 h-4 bg-stone-100 rounded relative overflow-hidden">
                <div className="h-full transition-all flex items-center justify-end pr-1.5 text-[9px] font-semibold text-white" style={{ width: `${(s.recurrentClients / maxRecurrent) * 100}%`, background: "#8B6F1A", minWidth: s.recurrentClients > 0 ? "20px" : 0 }}>
                  {s.recurrentClients > 0 ? s.recurrentClients : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-stone-400 italic mt-3">{t.recurrentDef}</div>
      </div>
    </div>
  );
}

// ========== TEMPLATES (Priority 1) ==========

function applyTemplate(body, clientName) {
  return (body || "").replace(/\{name\}/g, clientName || "");
}

// Modal that lets vendor pick a template + channel + recipient
function TemplatePickerModal({ t, templates, client, onSend, onClose }) {
  const [picked, setPicked] = useState(null);
  const [channel, setChannel] = useState("whatsapp");
  const finalText = picked ? applyTemplate(picked.body, client?.name) : "";

  function handleSend() {
    if (!picked) return;
    onSend({ template: picked, channel, text: finalText });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500">{t.pickTemplate}</div>
              {client && <div className="text-sm font-semibold mt-0.5">{client.name}</div>}
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1"><X size={16} /></button>
          </div>

          {templates.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-sm">{t.noTemplates}</div>
          ) : (
            <div className="space-y-2 mb-4">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setPicked(tpl)}
                  className={`w-full text-left rounded-xl p-3 transition-all ${picked?.id === tpl.id ? "bg-purple-50" : "bg-stone-50 hover:bg-stone-100"}`}
                  style={picked?.id === tpl.id ? { border: `2px solid ${BRAND_PURPLE}` } : { border: "2px solid transparent" }}
                >
                  <div className="font-medium text-sm">{tpl.title}</div>
                  <div className="text-xs text-stone-500 mt-0.5 line-clamp-2">{applyTemplate(tpl.body, client?.name || "[client]")}</div>
                </button>
              ))}
            </div>
          )}

          {picked && (
            <>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.sendVia}</div>
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                <button onClick={() => setChannel("whatsapp")} className={`py-2 rounded-lg text-xs font-medium ${channel === "whatsapp" ? "text-white" : "text-stone-600 bg-stone-100"}`} style={channel === "whatsapp" ? { background: "#25D366" } : {}}>{t.sendViaWhatsApp}</button>
                <button onClick={() => setChannel("sms")} className={`py-2 rounded-lg text-xs font-medium ${channel === "sms" ? "text-white" : "text-stone-600 bg-stone-100"}`} style={channel === "sms" ? { background: BRAND_PURPLE } : {}}>{t.sendViaSms}</button>
                <button onClick={() => setChannel("email")} className={`py-2 rounded-lg text-xs font-medium ${channel === "email" ? "text-white" : "text-stone-600 bg-stone-100"}`} style={channel === "email" ? { background: "#5A6B85" } : {}}>{t.sendViaEmail}</button>
              </div>

              <div className="bg-stone-50 rounded-lg p-3 mb-4 text-sm text-stone-700">{finalText}</div>

              <button onClick={handleSend} className="w-full py-3 rounded-lg text-sm font-semibold text-white" style={{ background: BRAND_PURPLE }}>
                <span className="inline-flex items-center gap-1.5"><MessageSquareText size={14} /> {t.sendTemplate}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TemplatesManager({ t, templates, updateTemplates }) {
  const [editingId, setEditingId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftBody, setDraftBody] = useState("");

  function startEdit(tpl) {
    setEditingId(tpl.id);
    setDraftTitle(tpl.title);
    setDraftBody(tpl.body);
    setCreating(false);
  }
  function startCreate() {
    setCreating(true);
    setEditingId(null);
    setDraftTitle("");
    setDraftBody("");
  }
  function cancel() {
    setEditingId(null);
    setCreating(false);
    setDraftTitle("");
    setDraftBody("");
  }
  async function save() {
    if (!draftTitle.trim() || !draftBody.trim()) return;
    if (creating) {
      const newTpl = { id: `tpl_${Date.now()}`, title: draftTitle.trim(), body: draftBody.trim(), channel: "any" };
      await updateTemplates([...templates, newTpl]);
    } else if (editingId) {
      await updateTemplates(templates.map((t2) => t2.id === editingId ? { ...t2, title: draftTitle.trim(), body: draftBody.trim() } : t2));
    }
    cancel();
  }
  async function remove(id) {
    await updateTemplates(templates.filter((t2) => t2.id !== id));
  }

  return (
    <div>
      <div className="text-xs text-stone-500 mb-3">{t.templatesSub}</div>

      {!creating && !editingId && (
        <button onClick={startCreate} className="w-full mb-4 py-2.5 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-1.5" style={{ background: BRAND_PURPLE }}>
          <Plus size={14} /> {t.addTemplate}
        </button>
      )}

      {(creating || editingId) && (
        <div className="bg-white rounded-2xl p-4 card-shadow mb-4 space-y-2" style={{ border: `1px solid ${BRAND_PURPLE}25` }}>
          <div className="text-sm font-semibold mb-1" style={{ color: BRAND_PURPLE }}>{creating ? t.addTemplate : t.editTemplate}</div>
          <input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} placeholder={t.templateTitle} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" autoFocus />
          <textarea value={draftBody} onChange={(e) => setDraftBody(e.target.value)} placeholder={t.templateBody} rows={3} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none resize-none" />
          <div className="text-[10px] text-stone-400 italic">{t.templatePlaceholderName}</div>
          <div className="flex gap-2">
            <button onClick={cancel} className="flex-1 py-2 rounded-lg bg-stone-100 text-xs font-medium text-stone-700">{t.cancel}</button>
            <button onClick={save} disabled={!draftTitle.trim() || !draftBody.trim()} className="flex-1 py-2 rounded-lg text-xs font-medium text-white disabled:opacity-40" style={{ background: BRAND_PURPLE }}>{t.save}</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {templates.length === 0 ? (
          <div className="text-center py-8 text-stone-400 text-sm italic">{t.noTemplates}</div>
        ) : (
          templates.map((tpl) => (
            <div key={tpl.id} className="bg-white rounded-2xl p-3 card-shadow">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="font-medium text-sm flex-1 min-w-0 truncate">{tpl.title}</div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => startEdit(tpl)} className="text-stone-400 hover:text-stone-700 p-1"><Pencil size={11} /></button>
                  <button onClick={() => remove(tpl.id)} className="text-stone-400 hover:text-red-600 p-1"><Trash2 size={11} /></button>
                </div>
              </div>
              <div className="text-xs text-stone-500 line-clamp-2">{tpl.body}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ========== TASKS (Priority 2) ==========

function compareDateTime(a, b) {
  const da = (a.dueDate || "9999-99-99") + (a.dueTime || "99:99");
  const db = (b.dueDate || "9999-99-99") + (b.dueTime || "99:99");
  return da.localeCompare(db);
}

function categorizeTask(task, todayStr) {
  if (task.completed) return "completed";
  if (!task.dueDate) return "later";
  if (task.dueDate < todayStr) return "overdue";
  if (task.dueDate === todayStr) return "today";
  // calculate end of week
  const today = new Date(todayStr);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
  const eowStr = dateKeyFor(endOfWeek);
  if (task.dueDate <= eowStr) return "thisWeek";
  return "later";
}

function TaskForm({ t, vendors, clients, defaultVendorId, onSave, onCancel, vendorScoped = false }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(todayKey());
  const [dueTime, setDueTime] = useState("");
  const [clientId, setClientId] = useState("");
  const [vendorId, setVendorId] = useState(defaultVendorId || (vendors[0]?.id || ""));
  const [note, setNote] = useState("");

  async function save() {
    if (!title.trim()) return;
    await onSave({
      title,
      dueDate,
      dueTime: dueTime || null,
      clientId: clientId || null,
      vendorId: vendorScoped ? defaultVendorId : (vendorId || null),
      note,
    });
    onCancel();
  }

  const visibleClients = vendorScoped ? clients.filter((c) => c.vendorId === defaultVendorId) : clients;

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow mb-4 space-y-2" style={{ border: `1px solid ${BRAND_PURPLE}25` }}>
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-semibold" style={{ color: BRAND_PURPLE }}>{t.newTask}</div>
        <button onClick={onCancel} className="text-stone-400 hover:text-stone-600 p-1"><X size={14} /></button>
      </div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t.taskTitle} autoFocus className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
      <div className="grid grid-cols-2 gap-2">
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
        <input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} placeholder={t.taskTime} className="bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
      </div>
      {!vendorScoped && (
        <select value={vendorId} onChange={(e) => setVendorId(e.target.value)} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none">
          <option value="">{t.noClient}</option>
          {vendors.map((v) => (<option key={v.id} value={v.id}>{v.name}</option>))}
        </select>
      )}
      <select value={clientId} onChange={(e) => setClientId(e.target.value)} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none">
        <option value="">{t.noClient}</option>
        {visibleClients.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
      </select>
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.taskNote} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
      <button onClick={save} disabled={!title.trim()} className="w-full py-2 rounded-lg text-sm font-medium text-white disabled:opacity-40 flex items-center justify-center gap-1" style={{ background: BRAND_PURPLE }}>
        <Check size={14} /> {t.saveTask}
      </button>
    </div>
  );
}

function TaskCard({ t, task, clients, vendors, onComplete, onDelete, showVendor = false }) {
  const client = task.clientId ? clients.find((c) => c.id === task.clientId) : null;
  const vendor = task.vendorId && showVendor ? vendors.find((v) => v.id === task.vendorId) : null;
  const todayStr = todayKey();
  const isOverdue = !task.completed && task.dueDate && task.dueDate < todayStr;
  const isToday = !task.completed && task.dueDate === todayStr;

  const borderColor = task.completed ? "#73A626" : isOverdue ? "#9C5757" : isToday ? "#5A6B85" : "#D6CFC4";

  return (
    <div className="bg-white rounded-2xl p-3 card-shadow" style={{ borderLeft: `3px solid ${borderColor}` }}>
      <div className="flex items-start gap-2.5">
        <button
          onClick={() => onComplete(task.id, !task.completed)}
          className="mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all"
          style={{
            background: task.completed ? "#73A626" : "transparent",
            border: task.completed ? "1.5px solid #73A626" : "1.5px solid #D6CFC4",
          }}
        >
          {task.completed && <Check size={12} className="text-white" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-medium ${task.completed ? "line-through text-stone-400" : ""}`}>{task.title}</div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] mt-0.5">
            {task.dueDate && (
              <span className={isOverdue ? "font-semibold" : "text-stone-500"} style={isOverdue ? { color: "#9C5757" } : {}}>
                <Calendar size={9} className="inline mr-0.5 -mt-0.5" />
                {task.dueDate}{task.dueTime ? ` · ${task.dueTime}` : ""}
                {isOverdue && ` · ${t.taskOverdue}`}
              </span>
            )}
            {client && <span className="text-stone-500">· {client.name}</span>}
            {vendor && <span className="text-stone-500">· {vendor.name}</span>}
          </div>
          {task.note && <div className="text-xs text-stone-500 mt-1 italic">"{task.note}"</div>}
        </div>
        <button onClick={() => onDelete(task.id)} className="text-stone-300 hover:text-red-600 p-1 flex-shrink-0"><Trash2 size={11} /></button>
      </div>
    </div>
  );
}

function VendorTasksSection({ t, vendorId, tasks, clients, vendors, onCreateTask, onUpdateTask, onDeleteTask }) {
  const [creating, setCreating] = useState(false);
  const todayStr = todayKey();
  const myTasks = tasks.filter((tk) => tk.vendorId === vendorId);

  const grouped = {
    overdue: [],
    today: [],
    thisWeek: [],
    later: [],
    completed: [],
  };
  myTasks.forEach((tk) => {
    grouped[categorizeTask(tk, todayStr)].push(tk);
  });
  Object.keys(grouped).forEach((k) => grouped[k].sort(compareDateTime));

  const totalActive = grouped.overdue.length + grouped.today.length + grouped.thisWeek.length + grouped.later.length;

  function complete(id, completed) {
    onUpdateTask(id, { completed });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs uppercase tracking-widest text-stone-500 flex items-center gap-1.5">
          <ListTodo size={11} /> {t.myTasks}
          {totalActive > 0 && <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: grouped.overdue.length > 0 ? "#F2E2E2" : "#E5EAF2", color: grouped.overdue.length > 0 ? "#9C5757" : "#5A6B85" }}>{totalActive}</span>}
        </div>
        <button onClick={() => setCreating(true)} className="text-xs flex items-center gap-1 px-2 py-1 rounded-md hover:bg-stone-100" style={{ color: BRAND_PURPLE }}>
          <Plus size={12} /> {t.addTask}
        </button>
      </div>

      {creating && (
        <TaskForm t={t} vendors={vendors} clients={clients} defaultVendorId={vendorId} vendorScoped={true} onSave={onCreateTask} onCancel={() => setCreating(false)} />
      )}

      {totalActive === 0 && !creating ? (
        <div className="text-center py-6 text-stone-400 text-sm italic">{t.noUpcoming}</div>
      ) : (
        <div className="space-y-3">
          {grouped.overdue.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "#9C5757" }}>{t.overdueTasks} ({grouped.overdue.length})</div>
              <div className="space-y-2">
                {grouped.overdue.map((tk) => <TaskCard key={tk.id} t={t} task={tk} clients={clients} vendors={vendors} onComplete={complete} onDelete={onDeleteTask} />)}
              </div>
            </div>
          )}
          {grouped.today.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.todayTasks} ({grouped.today.length})</div>
              <div className="space-y-2">
                {grouped.today.map((tk) => <TaskCard key={tk.id} t={t} task={tk} clients={clients} vendors={vendors} onComplete={complete} onDelete={onDeleteTask} />)}
              </div>
            </div>
          )}
          {grouped.thisWeek.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.thisWeekTasks} ({grouped.thisWeek.length})</div>
              <div className="space-y-2">
                {grouped.thisWeek.map((tk) => <TaskCard key={tk.id} t={t} task={tk} clients={clients} vendors={vendors} onComplete={complete} onDelete={onDeleteTask} />)}
              </div>
            </div>
          )}
          {grouped.later.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.laterTasks} ({grouped.later.length})</div>
              <div className="space-y-2">
                {grouped.later.map((tk) => <TaskCard key={tk.id} t={t} task={tk} clients={clients} vendors={vendors} onComplete={complete} onDelete={onDeleteTask} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TasksAdminView({ t, tasks, vendors, clients, onCreateTask, onUpdateTask, onDeleteTask, onBack }) {
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState("active"); // active | completed | all
  const todayStr = todayKey();

  let visible = tasks;
  if (filter === "active") visible = tasks.filter((tk) => !tk.completed);
  else if (filter === "completed") visible = tasks.filter((tk) => tk.completed);
  visible = visible.slice().sort(compareDateTime);

  const grouped = { overdue: [], today: [], thisWeek: [], later: [], completed: [] };
  visible.forEach((tk) => grouped[categorizeTask(tk, todayStr)].push(tk));

  function complete(id, completed) {
    onUpdateTask(id, { completed });
  }

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6 pb-24">
      <button onClick={onBack} className="flex items-center gap-1 text-stone-600 text-sm mb-6"><ArrowLeft size={16} /> {t.back}</button>

      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{prettyDate(t.locale)}</div>
          <h1 className="display text-3xl leading-tight flex items-center gap-2">
            <ListTodo size={22} /> {t.tasks}
          </h1>
        </div>
        <button onClick={() => setCreating(true)} className="px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold text-white flex-shrink-0" style={{ background: BRAND_PURPLE }}>
          <Plus size={13} /> {t.newTask}
        </button>
      </div>

      {creating && (
        <TaskForm t={t} vendors={vendors} clients={clients} onSave={onCreateTask} onCancel={() => setCreating(false)} />
      )}

      <div className="grid grid-cols-3 gap-1 mb-5 bg-white rounded-2xl p-1 card-shadow">
        <button onClick={() => setFilter("active")} className={`py-2 rounded-xl text-xs font-medium ${filter === "active" ? "text-white" : "text-stone-600"}`} style={{ background: filter === "active" ? BRAND_PURPLE : "transparent" }}>{t.upcomingTasks}</button>
        <button onClick={() => setFilter("completed")} className={`py-2 rounded-xl text-xs font-medium ${filter === "completed" ? "text-white" : "text-stone-600"}`} style={{ background: filter === "completed" ? BRAND_PURPLE : "transparent" }}>{t.completedTasks}</button>
        <button onClick={() => setFilter("all")} className={`py-2 rounded-xl text-xs font-medium ${filter === "all" ? "text-white" : "text-stone-600"}`} style={{ background: filter === "all" ? BRAND_PURPLE : "transparent" }}>{t.allTags}</button>
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-12 text-stone-400 text-sm italic">{t.noTasks}</div>
      ) : (
        <div className="space-y-4">
          {grouped.overdue.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "#9C5757" }}>{t.overdueTasks} ({grouped.overdue.length})</div>
              <div className="space-y-2">{grouped.overdue.map((tk) => <TaskCard key={tk.id} t={t} task={tk} clients={clients} vendors={vendors} onComplete={complete} onDelete={onDeleteTask} showVendor={true} />)}</div>
            </div>
          )}
          {grouped.today.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.todayTasks} ({grouped.today.length})</div>
              <div className="space-y-2">{grouped.today.map((tk) => <TaskCard key={tk.id} t={t} task={tk} clients={clients} vendors={vendors} onComplete={complete} onDelete={onDeleteTask} showVendor={true} />)}</div>
            </div>
          )}
          {grouped.thisWeek.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.thisWeekTasks} ({grouped.thisWeek.length})</div>
              <div className="space-y-2">{grouped.thisWeek.map((tk) => <TaskCard key={tk.id} t={t} task={tk} clients={clients} vendors={vendors} onComplete={complete} onDelete={onDeleteTask} showVendor={true} />)}</div>
            </div>
          )}
          {grouped.later.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.laterTasks} ({grouped.later.length})</div>
              <div className="space-y-2">{grouped.later.map((tk) => <TaskCard key={tk.id} t={t} task={tk} clients={clients} vendors={vendors} onComplete={complete} onDelete={onDeleteTask} showVendor={true} />)}</div>
            </div>
          )}
          {grouped.completed.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.completedTasks} ({grouped.completed.length})</div>
              <div className="space-y-2">{grouped.completed.map((tk) => <TaskCard key={tk.id} t={t} task={tk} clients={clients} vendors={vendors} onComplete={complete} onDelete={onDeleteTask} showVendor={true} />)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ========== HISTORY (Priority 3) ==========

function ClientHistoryDrawer({ t, client, interactions, onClose, onUpdateClient }) {
  const [longNote, setLongNote] = useState(client?.longNote || "");
  const [editing, setEditing] = useState(false);
  const clientInts = interactions.filter((i) => i.clientId === client.id).sort((a, b) => b.timestamp - a.timestamp);

  async function saveNote() {
    await onUpdateClient(client.id, { longNote: longNote.trim() });
    setEditing(false);
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500">{t.fullHistory}</div>
              <div className="text-lg font-semibold mt-0.5">{client.name}</div>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1"><X size={16} /></button>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] uppercase tracking-widest text-stone-500">{t.longNote}</div>
              {!editing && (
                <button onClick={() => setEditing(true)} className="text-[10px] flex items-center gap-1 px-2 py-0.5 rounded-md" style={{ background: BRAND_PURPLE + "15", color: BRAND_PURPLE }}>
                  <Pencil size={10} /> {client.longNote ? t.edit : t.addNote}
                </button>
              )}
            </div>
            {editing ? (
              <div className="space-y-2">
                <textarea value={longNote} onChange={(e) => setLongNote(e.target.value)} placeholder={t.longNotePlaceholder} rows={4} autoFocus className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none resize-none" />
                <div className="flex gap-2">
                  <button onClick={() => { setLongNote(client?.longNote || ""); setEditing(false); }} className="flex-1 py-1.5 rounded-lg bg-stone-100 text-xs font-medium text-stone-700">{t.cancel}</button>
                  <button onClick={saveNote} className="flex-1 py-1.5 rounded-lg text-xs font-medium text-white" style={{ background: BRAND_PURPLE }}>{t.saveNote}</button>
                </div>
              </div>
            ) : (
              <div className="bg-stone-50 rounded-lg p-3 text-sm text-stone-700 whitespace-pre-wrap min-h-[60px]">
                {client.longNote || <span className="text-stone-400 italic">{t.longNotePlaceholder}</span>}
              </div>
            )}
          </div>

          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">{t.history} ({clientInts.length})</div>
          {clientInts.length === 0 ? (
            <div className="text-center py-6 text-stone-400 text-sm italic">{t.historyEmpty}</div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {clientInts.map((int) => {
                const date = new Date(int.timestamp);
                const dateStr = date.toLocaleDateString(t.locale, { month: "short", day: "numeric" });
                const timeStr = date.toLocaleTimeString(t.locale, { hour: "2-digit", minute: "2-digit" });
                const channelIcon = int.channel === "call" ? "📞" : int.channel === "text" ? "💬" : int.channel === "email" ? "✉️" : "•";
                const statusLabel = int.status || "—";
                return (
                  <div key={int.id} className="bg-stone-50 rounded-lg p-2.5 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{channelIcon}</span>
                      <span className="font-medium capitalize">{statusLabel.replace(/_/g, " ")}</span>
                      <span className="text-stone-400 ml-auto">{dateStr} · {timeStr}</span>
                    </div>
                    {int.note && <div className="text-stone-600 italic">"{int.note}"</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ========== QUOTAS (Priority 4) ==========

function QuotaProgressCard({ t, vendorId, quotas, interactions, allInts }) {
  const goal = quotas[vendorId] || { ordersGoal: 0, callsGoal: 0 };
  if (!goal.ordersGoal && !goal.callsGoal) return null;

  // Compute month-to-date stats
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const myInts = (allInts || []).filter((i) => i.vendorId === vendorId && i.timestamp >= monthStart);
  const orders = myInts.filter((i) => i.status === "ordered" && i.channel === "call").length;
  const calls = myInts.filter((i) => i.channel === "call").length;

  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const dayOfMonth = now.getDate();
  const expectedPace = dayOfMonth / daysInMonth;
  const daysLeft = daysInMonth - dayOfMonth;

  const ordersPct = goal.ordersGoal > 0 ? Math.min(100, (orders / goal.ordersGoal) * 100) : 0;
  const callsPct = goal.callsGoal > 0 ? Math.min(100, (calls / goal.callsGoal) * 100) : 0;
  const ordersExpectedPct = expectedPace * 100;

  function paceColor(actualPct, expectedPct) {
    if (actualPct >= 100) return "#73A626";
    if (actualPct >= expectedPct - 5) return "#73A626";
    if (actualPct >= expectedPct - 15) return "#B8860B";
    return "#9C5757";
  }
  function paceLabel(actualPct, expectedPct) {
    if (actualPct >= 100) return t.quotaMet;
    if (actualPct > expectedPct + 5) return t.quotaAhead;
    if (actualPct >= expectedPct - 5) return t.quotaOnPace;
    return t.quotaBehind;
  }

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow mb-6" style={{ border: `1px solid ${BRAND_PURPLE}15` }}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs uppercase tracking-widest text-stone-500 flex items-center gap-1.5">
          <Target size={11} /> {t.quotaProgress}
        </div>
        <div className="text-[10px] text-stone-400">{t.daysLeftMonth(daysLeft)}</div>
      </div>

      {goal.ordersGoal > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-stone-700 font-medium">{t.ordersDone(orders, goal.ordersGoal)}</div>
            <div className="text-[10px] font-semibold" style={{ color: paceColor(ordersPct, ordersExpectedPct) }}>{paceLabel(ordersPct, ordersExpectedPct)}</div>
          </div>
          <div className="h-2 bg-stone-100 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full transition-all" style={{ width: `${ordersPct}%`, background: paceColor(ordersPct, ordersExpectedPct) }} />
            <div className="absolute top-0 h-full w-0.5" style={{ left: `${ordersExpectedPct}%`, background: "rgba(0,0,0,0.3)" }} />
          </div>
        </div>
      )}

      {goal.callsGoal > 0 && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-stone-700 font-medium">{t.callsDone(calls, goal.callsGoal)}</div>
            <div className="text-[10px] font-semibold" style={{ color: paceColor(callsPct, ordersExpectedPct) }}>{paceLabel(callsPct, ordersExpectedPct)}</div>
          </div>
          <div className="h-2 bg-stone-100 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full transition-all" style={{ width: `${callsPct}%`, background: paceColor(callsPct, ordersExpectedPct) }} />
            <div className="absolute top-0 h-full w-0.5" style={{ left: `${ordersExpectedPct}%`, background: "rgba(0,0,0,0.3)" }} />
          </div>
        </div>
      )}
    </div>
  );
}

function QuotaManager({ t, vendors, quotas, interactions, setQuotaForVendor }) {
  const [editingId, setEditingId] = useState(null);
  const [draftOrders, setDraftOrders] = useState("");
  const [draftCalls, setDraftCalls] = useState("");

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  function startEdit(v) {
    const cur = quotas[v.id] || { ordersGoal: 0, callsGoal: 0 };
    setEditingId(v.id);
    setDraftOrders(String(cur.ordersGoal || ""));
    setDraftCalls(String(cur.callsGoal || ""));
  }
  async function save(v) {
    await setQuotaForVendor(v.id, draftOrders || 0, draftCalls || 0);
    setEditingId(null);
  }

  return (
    <div>
      <div className="text-xs text-stone-500 mb-3">{t.quotasSub}</div>
      <div className="space-y-2">
        {vendors.map((v) => {
          const cur = quotas[v.id] || { ordersGoal: 0, callsGoal: 0 };
          const isEditing = editingId === v.id;
          // Compute MTD stats
          const myInts = (interactions || []).filter((i) => i.vendorId === v.id && i.timestamp >= monthStart);
          const orders = myInts.filter((i) => i.status === "ordered" && i.channel === "call").length;
          const calls = myInts.filter((i) => i.channel === "call").length;

          return (
            <div key={v.id} className="bg-white rounded-2xl p-3 card-shadow">
              {!isEditing ? (
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{v.name}</div>
                    <div className="text-xs text-stone-500 mt-0.5 space-x-2">
                      <span>{t.ordersDone(orders, cur.ordersGoal)}</span>
                      <span>·</span>
                      <span>{t.callsDone(calls, cur.callsGoal)}</span>
                    </div>
                  </div>
                  <button onClick={() => startEdit(v)} className="px-2.5 py-1 rounded-md flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide flex-shrink-0" style={{ background: BRAND_PURPLE + "15", color: BRAND_PURPLE }}>
                    <Pencil size={10} /> {t.setQuota}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm font-semibold">{v.name}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.ordersGoal}</div>
                      <input type="number" min="0" value={draftOrders} onChange={(e) => setDraftOrders(e.target.value)} placeholder="0" className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.callsGoal}</div>
                      <input type="number" min="0" value={draftCalls} onChange={(e) => setDraftCalls(e.target.value)} placeholder="0" className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingId(null)} className="flex-1 py-1.5 rounded-lg bg-stone-100 text-xs font-medium text-stone-700">{t.cancel}</button>
                    <button onClick={() => save(v)} className="flex-1 py-1.5 rounded-lg text-xs font-medium text-white" style={{ background: BRAND_PURPLE }}>{t.saveQuota}</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ========== TAGS (Priority 5) ==========

const TAG_COLORS = ["#B8860B", "#9C5757", "#8B7355", "#5A4A6B", "#2D5A3D", "#5A6B85", "#C73E5A", "#1C7E7E"];

function TagBadge({ tag }) {
  if (!tag) return null;
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ background: tag.color + "20", color: tag.color }}>
      {tag.label}
    </span>
  );
}

function TagPickerModal({ t, tags, currentTagIds, onSave, onClose }) {
  const [selected, setSelected] = useState(currentTagIds || []);

  function toggle(id) {
    setSelected(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-widest text-stone-500 flex items-center gap-1.5"><Tag size={11} /> {t.tags}</div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1"><X size={16} /></button>
          </div>
          {tags.length === 0 ? (
            <div className="text-center py-6 text-stone-400 text-sm italic">{t.noTags}</div>
          ) : (
            <div className="space-y-2 mb-4">
              {tags.map((tg) => (
                <button key={tg.id} onClick={() => toggle(tg.id)} className="w-full flex items-center justify-between rounded-lg p-2.5 transition-all" style={{ background: selected.includes(tg.id) ? tg.color + "15" : "#F5F1EA", border: selected.includes(tg.id) ? `1.5px solid ${tg.color}` : "1.5px solid transparent" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: tg.color }} />
                    <div className="text-sm font-medium">{tg.label}</div>
                  </div>
                  {selected.includes(tg.id) && <Check size={14} style={{ color: tg.color }} />}
                </button>
              ))}
            </div>
          )}
          <button onClick={() => { onSave(selected); onClose(); }} className="w-full py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: BRAND_PURPLE }}>{t.save}</button>
        </div>
      </div>
    </div>
  );
}

function TagsManager({ t, tags, updateTags }) {
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draftLabel, setDraftLabel] = useState("");
  const [draftColor, setDraftColor] = useState(TAG_COLORS[0]);

  function startCreate() {
    setCreating(true);
    setEditingId(null);
    setDraftLabel("");
    setDraftColor(TAG_COLORS[0]);
  }
  function startEdit(tg) {
    setEditingId(tg.id);
    setCreating(false);
    setDraftLabel(tg.label);
    setDraftColor(tg.color);
  }
  function cancel() {
    setCreating(false);
    setEditingId(null);
    setDraftLabel("");
  }
  async function save() {
    if (!draftLabel.trim()) return;
    if (creating) {
      const newTag = { id: `tag_${Date.now()}`, label: draftLabel.trim(), color: draftColor };
      await updateTags([...tags, newTag]);
    } else if (editingId) {
      await updateTags(tags.map((tg) => tg.id === editingId ? { ...tg, label: draftLabel.trim(), color: draftColor } : tg));
    }
    cancel();
  }
  async function remove(id) {
    await updateTags(tags.filter((tg) => tg.id !== id));
  }

  return (
    <div>
      <div className="text-xs text-stone-500 mb-3">{t.tagsSub}</div>

      {!creating && !editingId && (
        <button onClick={startCreate} className="w-full mb-4 py-2.5 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-1.5" style={{ background: BRAND_PURPLE }}>
          <Plus size={14} /> {t.addTag}
        </button>
      )}

      {(creating || editingId) && (
        <div className="bg-white rounded-2xl p-4 card-shadow mb-4 space-y-2" style={{ border: `1px solid ${BRAND_PURPLE}25` }}>
          <input value={draftLabel} onChange={(e) => setDraftLabel(e.target.value)} placeholder={t.tagLabel} autoFocus className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
          <div>
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.tagColor}</div>
            <div className="flex flex-wrap gap-1.5">
              {TAG_COLORS.map((c) => (
                <button key={c} onClick={() => setDraftColor(c)} className="w-7 h-7 rounded-full transition-all" style={{ background: c, border: draftColor === c ? "2px solid #1C1B1A" : "2px solid transparent", transform: draftColor === c ? "scale(1.1)" : "scale(1)" }} />
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={cancel} className="flex-1 py-2 rounded-lg bg-stone-100 text-xs font-medium text-stone-700">{t.cancel}</button>
            <button onClick={save} disabled={!draftLabel.trim()} className="flex-1 py-2 rounded-lg text-xs font-medium text-white disabled:opacity-40" style={{ background: BRAND_PURPLE }}>{t.save}</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {tags.length === 0 ? (
          <div className="text-center py-8 text-stone-400 text-sm italic">{t.noTags}</div>
        ) : (
          tags.map((tg) => (
            <div key={tg.id} className="bg-white rounded-2xl p-3 card-shadow flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: tg.color }} />
                <div className="font-medium text-sm truncate">{tg.label}</div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => startEdit(tg)} className="text-stone-400 hover:text-stone-700 p-1"><Pencil size={11} /></button>
                <button onClick={() => remove(tg.id)} className="text-stone-400 hover:text-red-600 p-1"><Trash2 size={11} /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ---------- SETUP VIEW ----------
function SetupView({ t, vendors, clients, dataEntryUsers, templates, tags, quotas, interactions, updateVendors, updateClients, updateDataEntryUsers, updateTemplates, updateTags, setQuotaForVendor, adminCreds, changeAdminCreds, onBack }) {
  const [tab, setTab] = useState("vendors");
  return (
    <div className="max-w-2xl mx-auto px-5 pt-6 pb-24">
      <button onClick={onBack} className="flex items-center gap-1 text-stone-600 text-sm mb-6"><ArrowLeft size={16} /> {t.back}</button>
      <h1 className="display text-3xl leading-tight mb-6 flex items-center gap-2"><Settings size={22} /> {t.settings}</h1>
      <div className="grid grid-cols-3 gap-1 mb-2 bg-white rounded-2xl p-1 card-shadow">
        <button onClick={() => setTab("vendors")} className={`py-2 px-2 rounded-xl text-[11px] font-medium transition-all ${tab === "vendors" ? "text-white" : "text-stone-600"}`} style={{ background: tab === "vendors" ? "#5F2F9D" : "transparent" }}>{t.repsTab}</button>
        <button onClick={() => setTab("clients")} className={`py-2 px-2 rounded-xl text-[11px] font-medium transition-all ${tab === "clients" ? "text-white" : "text-stone-600"}`} style={{ background: tab === "clients" ? "#5F2F9D" : "transparent" }}>{t.clientsTab}</button>
        <button onClick={() => setTab("team")} className={`py-2 px-2 rounded-xl text-[11px] font-medium transition-all flex items-center justify-center gap-1 ${tab === "team" ? "text-white" : "text-stone-600"}`} style={{ background: tab === "team" ? "#5F2F9D" : "transparent" }}>
          <Database size={11} /> {t.teamAccounts}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1 mb-6 bg-white rounded-2xl p-1 card-shadow">
        <button onClick={() => setTab("templates")} className={`py-2 px-1 rounded-xl text-[11px] font-medium transition-all flex items-center justify-center gap-1 ${tab === "templates" ? "text-white" : "text-stone-600"}`} style={{ background: tab === "templates" ? "#5F2F9D" : "transparent" }}>
          <MessageSquareText size={10} /> {t.templatesTab}
        </button>
        <button onClick={() => setTab("quotas")} className={`py-2 px-1 rounded-xl text-[11px] font-medium transition-all flex items-center justify-center gap-1 ${tab === "quotas" ? "text-white" : "text-stone-600"}`} style={{ background: tab === "quotas" ? "#5F2F9D" : "transparent" }}>
          <Target size={10} /> {t.quotasTab}
        </button>
        <button onClick={() => setTab("tags")} className={`py-2 px-1 rounded-xl text-[11px] font-medium transition-all flex items-center justify-center gap-1 ${tab === "tags" ? "text-white" : "text-stone-600"}`} style={{ background: tab === "tags" ? "#5F2F9D" : "transparent" }}>
          <Tag size={10} /> {t.tagsTab}
        </button>
        <button onClick={() => setTab("creds")} className={`py-2 px-1 rounded-xl text-[11px] font-medium transition-all flex items-center justify-center gap-1 ${tab === "creds" ? "text-white" : "text-stone-600"}`} style={{ background: tab === "creds" ? "#5F2F9D" : "transparent" }}>
          <Lock size={10} /> {t.credentialsTab}
        </button>
      </div>
      {tab === "vendors" && <VendorsManager t={t} vendors={vendors} updateVendors={updateVendors} />}
      {tab === "clients" && <ClientsManager t={t} clients={clients} vendors={vendors} updateClients={updateClients} />}
      {tab === "team" && <DataEntryManager t={t} dataEntryUsers={dataEntryUsers} updateDataEntryUsers={updateDataEntryUsers} />}
      {tab === "templates" && <TemplatesManager t={t} templates={templates} updateTemplates={updateTemplates} />}
      {tab === "quotas" && <QuotaManager t={t} vendors={vendors} quotas={quotas} interactions={interactions} setQuotaForVendor={setQuotaForVendor} />}
      {tab === "tags" && <TagsManager t={t} tags={tags} updateTags={updateTags} />}
      {tab === "creds" && <CredentialsManager t={t} vendors={vendors} updateVendors={updateVendors} adminCreds={adminCreds} changeAdminCreds={changeAdminCreds} />}
    </div>
  );
}

function DataEntryManager({ t, dataEntryUsers, updateDataEntryUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [revealed, setRevealed] = useState({});
  const [error, setError] = useState("");

  function add() {
    setError("");
    if (!name.trim()) { setError(t.nameRequired); return; }
    const finalEmail = email.trim().toLowerCase() || defaultEmailFromName(name);
    const finalPwd = password || defaultPasswordFromName(name);
    if (dataEntryUsers.some((u) => u.email && u.email.toLowerCase() === finalEmail)) {
      setError(t.emailAlreadyTaken); return;
    }
    updateDataEntryUsers([...dataEntryUsers, { id: `de_${Date.now()}`, name: name.trim(), email: finalEmail, password: finalPwd }]);
    setName(""); setEmail(""); setPassword("");
  }
  function remove(id) { updateDataEntryUsers(dataEntryUsers.filter((u) => u.id !== id)); }
  function toggleReveal(id) { setRevealed({ ...revealed, [id]: !revealed[id] }); }

  return (
    <div>
      <div className="text-xs text-stone-500 mb-3">{t.teamAccountsSub}</div>
      <div className="bg-white rounded-2xl p-4 card-shadow mb-4 space-y-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.fullName} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
        <input type="email" autoCapitalize="none" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={`${t.email} (auto)`} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={`${t.password} (auto)`} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none font-mono" />
        {error && <div className="text-xs px-2 py-1 rounded-md" style={{ background: "#F2E2E2", color: "#9C5757" }}>{error}</div>}
        <button onClick={add} className="w-full py-2 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-1" style={{ background: "#5F2F9D" }}>
          <Plus size={14} /> {t.addDataEntry}
        </button>
      </div>
      <div className="space-y-2">
        {dataEntryUsers.length === 0 ? (
          <div className="text-center py-6 text-stone-400 text-xs italic">No data entry users yet</div>
        ) : (
          dataEntryUsers.map((u) => (
            <div key={u.id} className="bg-white rounded-2xl p-3 card-shadow flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: BRAND_PURPLE + "15", color: BRAND_PURPLE }}>
                  <Database size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{u.name}</div>
                  <div className="text-xs text-stone-500 truncate font-mono">{u.email}</div>
                  <div className="text-[10px] text-stone-400 font-mono">{revealed[u.id] ? u.password : "••••••••"}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <button onClick={() => toggleReveal(u.id)} className="text-[10px] px-2 py-1 rounded-md text-stone-600 hover:bg-stone-100">
                  {revealed[u.id] ? t.hidePassword : t.showPassword}
                </button>
                <button onClick={() => remove(u.id)} className="text-stone-400 hover:text-red-600 p-1"><Trash2 size={12} /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function CredentialsManager({ t, vendors, updateVendors, adminCreds, changeAdminCreds }) {
  const [editingId, setEditingId] = useState(null);
  const [draftEmail, setDraftEmail] = useState("");
  const [draftPassword, setDraftPassword] = useState("");
  const [editingAdmin, setEditingAdmin] = useState(false);
  const [adminEmailDraft, setAdminEmailDraft] = useState("");
  const [adminPasswordDraft, setAdminPasswordDraft] = useState("");
  const [revealed, setRevealed] = useState({});

  function startEdit(v) {
    setEditingId(v.id);
    setDraftEmail(v.email || "");
    setDraftPassword(v.password || "");
  }
  function cancelEdit() { setEditingId(null); setDraftEmail(""); setDraftPassword(""); }
  async function saveVendor(id) {
    const email = draftEmail.trim().toLowerCase();
    if (!email || !draftPassword) return;
    const next = vendors.map((v) => (v.id === id ? { ...v, email, password: draftPassword } : v));
    await updateVendors(next);
    cancelEdit();
  }
  function startEditAdmin() {
    setEditingAdmin(true);
    setAdminEmailDraft(adminCreds.email);
    setAdminPasswordDraft(adminCreds.password);
  }
  async function saveAdmin() {
    const email = adminEmailDraft.trim().toLowerCase();
    if (!email || !adminPasswordDraft) return;
    await changeAdminCreds({ email, password: adminPasswordDraft });
    setEditingAdmin(false);
  }
  function toggleReveal(id) { setRevealed({ ...revealed, [id]: !revealed[id] }); }

  return (
    <div className="space-y-6">
      {/* Admin credentials */}
      <div>
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-1.5">
          <Crown size={11} /> {t.adminCredentials}
        </div>
        <div className="bg-white rounded-2xl p-4 card-shadow">
          {!editingAdmin ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#1C1B1A", color: "#F5F1EA" }}>
                  <Crown size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-stone-500 mb-0.5">{t.email}</div>
                  <div className="text-sm font-mono truncate">{adminCreds.email}</div>
                  <div className="text-xs text-stone-500 mt-1">{t.password}</div>
                  <div className="text-sm font-mono">{revealed.admin ? adminCreds.password : "••••••••"}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <button onClick={() => toggleReveal("admin")} className="text-[10px] px-2 py-1 rounded-md text-stone-600 hover:bg-stone-100 flex items-center gap-1">
                  {revealed.admin ? <><EyeOff size={10} /> {t.hidePassword}</> : <><Eye size={10} /> {t.showPassword}</>}
                </button>
                <button onClick={startEditAdmin} className="px-2.5 py-1 rounded-md flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide" style={{ background: BRAND_PURPLE + "15", color: BRAND_PURPLE }}>
                  <Pencil size={10} /> {t.edit}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.email}</div>
                <input type="email" autoFocus value={adminEmailDraft} onChange={(e) => setAdminEmailDraft(e.target.value)} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" autoCapitalize="none" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.password}</div>
                <input type="text" value={adminPasswordDraft} onChange={(e) => setAdminPasswordDraft(e.target.value)} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none font-mono" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingAdmin(false)} className="flex-1 py-2 rounded-lg bg-stone-100 text-xs font-medium text-stone-700">{t.cancel}</button>
                <button onClick={saveAdmin} disabled={!adminEmailDraft.trim() || !adminPasswordDraft} className="flex-1 py-2 rounded-lg text-xs font-medium text-white disabled:opacity-40" style={{ background: BRAND_PURPLE }}>{t.save}</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vendor credentials */}
      <div>
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-1.5">
          <Lock size={11} /> {t.repsCredentials}
        </div>
        <div className="space-y-2">
          {vendors.map((v) => {
            const isEditing = editingId === v.id;
            const isRevealed = revealed[v.id];
            return (
              <div key={v.id} className="bg-white rounded-2xl p-3 card-shadow">
                {!isEditing ? (
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#F0EAE0", color: "#8B7355" }}>
                        <Mail size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{v.name}</div>
                        <div className="text-xs font-mono text-stone-600 truncate">{v.email}</div>
                        <div className="text-xs font-mono text-stone-500 mt-0.5">{isRevealed ? v.password : "••••••••"}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <button onClick={() => toggleReveal(v.id)} className="text-[10px] px-2 py-1 rounded-md text-stone-600 hover:bg-stone-100 flex items-center gap-1">
                        {isRevealed ? <><EyeOff size={10} /> {t.hidePassword}</> : <><Eye size={10} /> {t.showPassword}</>}
                      </button>
                      <button onClick={() => startEdit(v)} className="px-2.5 py-1 rounded-md flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide" style={{ background: BRAND_PURPLE + "15", color: BRAND_PURPLE }}>
                        <Pencil size={10} /> {t.edit}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-sm font-medium">{v.name}</div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.email}</div>
                      <input type="email" autoFocus value={draftEmail} onChange={(e) => setDraftEmail(e.target.value)} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" autoCapitalize="none" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{t.password}</div>
                      <input type="text" value={draftPassword} onChange={(e) => setDraftPassword(e.target.value)} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none font-mono" />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={cancelEdit} className="flex-1 py-2 rounded-lg bg-stone-100 text-xs font-medium text-stone-700">{t.cancel}</button>
                      <button onClick={() => saveVendor(v.id)} disabled={!draftEmail.trim() || !draftPassword} className="flex-1 py-2 rounded-lg text-xs font-medium text-white disabled:opacity-40" style={{ background: BRAND_PURPLE }}>{t.save}</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VendorsManager({ t, vendors, updateVendors }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function add() {
    if (!name.trim()) return;
    const finalEmail = email.trim().toLowerCase() || defaultEmailFromName(name);
    const finalPassword = password || defaultPasswordFromName(name);
    updateVendors([...vendors, { id: `v_${Date.now()}`, name: name.trim(), phone: phone.trim(), email: finalEmail, password: finalPassword }]);
    setName(""); setPhone(""); setEmail(""); setPassword("");
  }
  function remove(id) { updateVendors(vendors.filter((v) => v.id !== id)); }

  return (
    <div>
      <div className="bg-white rounded-2xl p-4 card-shadow mb-4 space-y-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.repName} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phoneSms} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
        <input
          type="email"
          autoCapitalize="none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={`${t.email} (auto)`}
          className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none"
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`${t.password} (auto)`}
          className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none font-mono"
        />
        <button onClick={add} className="w-full py-2 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-1" style={{ background: "#5F2F9D" }}><Plus size={14} /> {t.add}</button>
      </div>
      <div className="space-y-2">
        {vendors.map((v) => (
          <div key={v.id} className="bg-white rounded-2xl p-3 card-shadow flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{v.name}</div>
              <div className="text-xs text-stone-500 truncate">{v.phone || t.noPhone}</div>
              <div className="text-[10px] text-stone-400 truncate font-mono mt-0.5">{v.email}</div>
            </div>
            <button onClick={() => remove(v.id)} className="text-stone-400 hover:text-red-600 p-1 flex-shrink-0"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientsManager({ t, clients, vendors, updateClients }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vendorId, setVendorId] = useState(vendors[0]?.id || "");
  const [frequency, setFrequency] = useState("daily");
  const [filter, setFilter] = useState("all");
  function add() { if (!name.trim() || !vendorId) return; updateClients([...clients, { id: `c_${Date.now()}`, name: name.trim(), phone: phone.trim(), vendorId, frequency }]); setName(""); setPhone(""); }
  function remove(id) { updateClients(clients.filter((c) => c.id !== id)); }
  function reassign(id, newVendorId) { updateClients(clients.map((c) => (c.id === id ? { ...c, vendorId: newVendorId } : c))); }
  const visible = filter === "all" ? clients : clients.filter((c) => c.vendorId === filter);

  return (
    <div>
      <div className="bg-white rounded-2xl p-4 card-shadow mb-4 space-y-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.clientName} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phone} className="w-full bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none" />
        <div className="grid grid-cols-2 gap-2">
          <select value={vendorId} onChange={(e) => setVendorId(e.target.value)} className="bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none">
            {vendors.map((v) => (<option key={v.id} value={v.id}>{v.name}</option>))}
          </select>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="bg-stone-50 rounded-lg px-3 py-2 text-sm outline-none">
            <option value="daily">{t.daily}</option>
            <option value="twiceweek">{t.twiceweek}</option>
            <option value="weekly">{t.weekly}</option>
            <option value="biweekly">{t.biweekly}</option>
          </select>
        </div>
        <button onClick={add} className="w-full py-2 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-1" style={{ background: "#5F2F9D" }}><Plus size={14} /> {t.add}</button>
      </div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full mb-3 bg-white rounded-xl px-3 py-2 text-sm outline-none card-shadow">
        <option value="all">{t.allClients} ({clients.length})</option>
        {vendors.map((v) => (<option key={v.id} value={v.id}>{v.name} ({clients.filter((c) => c.vendorId === v.id).length})</option>))}
      </select>
      <div className="space-y-2">
        {visible.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl p-3 card-shadow flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{c.name}</div>
              <div className="text-xs text-stone-500 truncate">{c.phone} · {freqLabel(c.frequency, t)}</div>
            </div>
            <select value={c.vendorId} onChange={(e) => reassign(c.id, e.target.value)} className="bg-stone-50 rounded-lg px-2 py-1 text-xs outline-none">
              {vendors.map((v) => (<option key={v.id} value={v.id}>{v.name}</option>))}
            </select>
            <button onClick={() => remove(c.id)} className="text-stone-400 hover:text-red-600 p-1"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
