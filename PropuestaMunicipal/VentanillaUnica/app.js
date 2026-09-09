const app=document.getElementById('app');
const fakeUser={name:'María Fernanda Torres',cedula:'1104567890'};
const sections=[['inicio','Inicio'],['tramites','Mis trámites'],['pagos','Mis pagos'],['notificaciones','Notificaciones'],['participacion','Participación']];
const ASESOR={nombre:'Lcda. Patricia Cueva',cargo:'Asesora especialista · Rentas Municipales',sala:'Sala de orientación ciudadana'};

const personaPatricia=`<svg class="zoom-face" viewBox="0 0 220 240" role="img" aria-label="Lcda. Patricia Cueva en videollamada">
  <rect width="220" height="240" fill="#1A2740"/>
  <rect x="0" y="150" width="220" height="90" fill="#24344F"/>
  <rect x="18" y="28" width="52" height="70" fill="#2C3D58"/>
  <rect x="150" y="36" width="52" height="62" fill="#2C3D58"/>
  <path d="M0 198h220v42H0z" fill="#1A2436"/>
  <ellipse cx="110" cy="168" rx="58" ry="22" fill="#7A1C29"/>
  <path d="M62 168c8-38 18-58 48-58s40 20 48 58v52H62z" fill="#7A1C29"/>
  <path d="M78 210h64v18H78z" fill="#D9A526" opacity="0.85"/>
  <text x="110" y="223" text-anchor="middle" font-size="7.5" font-family="Inter,sans-serif" fill="#3A2A05">GAD LOJA</text>
  <ellipse cx="110" cy="92" rx="40" ry="44" fill="#2A1C16"/>
  <circle cx="74" cy="108" r="7" fill="#E2B896"/>
  <circle cx="146" cy="108" r="7" fill="#E2B896"/>
  <ellipse cx="110" cy="104" rx="34" ry="38" fill="#E8C4A0"/>
  <path d="M78 86c12-22 52-22 64 0 2 8-6 14-14 12-12-4-24-4-36 0-8 2-16-4-14-12z" fill="#2A1C16"/>
  <path d="M86 78c6-10 42-10 48 6-18-6-32-6-48-6z" fill="#1A120E"/>
  <g fill="none" stroke="#3D6E93" stroke-width="2.2">
    <circle cx="96" cy="104" r="8"/>
    <circle cx="124" cy="104" r="8"/>
    <path d="M104 104h12"/>
  </g>
  <ellipse cx="96" cy="104" rx="3.2" ry="3.6" fill="#3B2C22"/>
  <ellipse cx="124" cy="104" rx="3.2" ry="3.6" fill="#3B2C22"/>
  <path d="M110 112v8" stroke="#D9B387" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M100 128q10 7 20 0" stroke="#B36A5E" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M88 96q6-5 12 0" stroke="#2A1C16" stroke-width="1.6" fill="none"/>
  <path d="M120 96q6-5 12 0" stroke="#2A1C16" stroke-width="1.6" fill="none"/>
</svg>`;

const personaCiudadana=`<svg class="zoom-face self" viewBox="0 0 160 170" role="img" aria-label="María Fernanda Torres en videollamada">
  <rect width="160" height="170" fill="#152033"/>
  <ellipse cx="80" cy="128" rx="46" ry="28" fill="#2B5170"/>
  <ellipse cx="80" cy="72" rx="32" ry="36" fill="#33251C"/>
  <ellipse cx="80" cy="80" rx="26" ry="30" fill="#F1DAB8"/>
  <path d="M68 72q6-4 12 0" stroke="#33251C" stroke-width="2" fill="none"/>
  <path d="M80 72q6-4 12 0" stroke="#33251C" stroke-width="2" fill="none"/>
  <circle cx="72" cy="80" r="2.4" fill="#3B2C22"/>
  <circle cx="88" cy="80" r="2.4" fill="#3B2C22"/>
  <path d="M72 98q8 5 16 0" stroke="#B36A5E" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>`;

const DOC_CEDULA={id:'cedula',label:'Cédula de identidad',hint:'Copia de cédula del propietario o cónyuge. Extranjeros: pasaporte. Personas jurídicas: RUC.'};
const DOC_ESCRITURAS={id:'escrituras',label:'Escrituras inscritas',hint:'Copias simples de la escritura debidamente inscritas en el Registro de la Propiedad.'};
const DOC_REGISTRO={id:'registro',label:'Certificado del Registro de la Propiedad',hint:'Certificado historiado y linderado actualizado.'};
const DOC_PREDIAL={id:'predial',label:'Comprobante de impuesto predial',hint:'Copia del pago del impuesto predial vigente (predio urbano o rural).'};

const FLOWS={
  avaluo:{
    id:'avaluo',
    nombre:'Certificado de Avalúos y Catastros',
    expediente:'LOJ-2026-005210',
    unidad:'Avalúos y Catastros',
    destino:'Jefe de Avalúos y Catastros — GAD Municipal de Loja',
    costo:'$8,00',
    scenario:'happy',
    badge:'Escenario 1 · sin observaciones',
    steps:['Solicitud','Documentos','Revisión IA','Pago','Expediente'],
    docs:[DOC_CEDULA,DOC_ESCRITURAS,DOC_REGISTRO,DOC_PREDIAL],
    welcome:'Buenos días, María Fernanda. Soy el Revisor Documental Inteligente. Completaré el cruce entre su solicitud y los requisitos oficiales del Certificado de Avalúos y Catastros. Si no hay inconsistencias, habilitaré el pago.',
    detalle:'Solicitud de certificado de avalúo y datos catastrales del predio. Pendiente formulario, documentos, revisión y pago del derecho de certificación.'
  },
  exoneracion:{
    id:'exoneracion',
    nombre:'Exoneración de impuesto predial (tercera edad)',
    expediente:'LOJ-2026-005318',
    unidad:'Rentas',
    destino:'Dirección Financiera — GAD Municipal de Loja',
    costo:'Sin costo',
    scenario:'inconsistencia',
    badge:'Escenario 2 · con asistencia',
    steps:['Solicitud','Documentos','Revisión IA','Videollamada'],
    docs:[DOC_CEDULA,DOC_ESCRITURAS,DOC_PREDIAL],
    ticket:'AYU-2026-00418',
    welcome:'Buenos días, María Fernanda. Soy el Revisor Documental Inteligente. Revisaré su solicitud de exoneración del impuesto predial (tercera edad) frente a cédula, escrituras inscritas y el comprobante predial vigente. Si encuentro una inconsistencia, podrá pedir ayuda humana.',
    detalle:'Exoneración de impuesto predial por tercera edad. Pendiente solicitud, documentos y revisión.'
  }
};

function flow(){return FLOWS[state.tramite]||null;}
function isDemo(){return !!flow();}
function requiredDocs(){return (flow()||FLOWS.avaluo).docs;}
function emptyDocs(id='avaluo'){return (FLOWS[id]||FLOWS.avaluo).docs.reduce((acc,d)=>{acc[d.id]=null;return acc;},{});}

function defaultForm(id='avaluo'){
  const fl=FLOWS[id]||FLOWS.avaluo;
  return {
    nombres:'María Fernanda',
    apellido1:'Torres',
    apellido2:'Castillo',
    cedula:'1104567890',
    email:'maria.fernanda.torres@ciudadano.ec',
    telefono:'07 257 1840',
    celular:'099 456 7821',
    domicilio:'Av. 8 de Diciembre Nro. 12-40 y Salvador Bustamante Celi, Loja',
    destino:fl.destino,
    tipoExoneracion:'Tercera edad',
    parroquia:'',
    barrio:'',
    claveCatastral:'',
    numeroPredial:'',
    direccionPredio:'',
    area:'',
    tipoPredio:'',
    uso:'',
    motivo:''
  };
}

function welcomeChat(id='avaluo'){
  return [{role:'bot',text:(FLOWS[id]||FLOWS.avaluo).welcome}];
}

const state={
  logged:false,
  section:'inicio',
  tramite:null,
  step:1,
  paid:false,
  reviewed:false,
  reviewing:false,
  observed:false,
  helpRequested:false,
  salaPhase:null,
  asesorHabla:false,
  zoomMic:true,
  zoomCam:true,
  reviewItems:[],
  reviewTotal:0,
  form:defaultForm(),
  uploads:emptyDocs(),
  chat:welcomeChat(),
  helpChat:[],
  timeline:[],
  catalogQuery:'',
  catalogCat:'Todas',
  catalogMsg:null
};

let reviewSeq=0;
let salaSeq=0;

const parroquias=['El Sagrario','San Sebastián','Sucre','Valle','Punzara','Malacatos','Vilcabamba','San Lucas','Yangana','Taquil','Jimbilla','El Cisne','Gualel','Chuquiribamba','Quinara','Santiago','San Pedro de Vilcabamba'];
const usosSuelo=['Residencial','Comercial','Mixto residencial-comercial','Equipamiento','Industrial liviano'];
const tiposPredio=['Urbano','Rural'];

const misTramites=[
  {codigo:FLOWS.avaluo.expediente,nombre:FLOWS.avaluo.nombre,fecha:'09/09/2026',estado:'En proceso',tone:'info',unidad:FLOWS.avaluo.unidad,flow:'avaluo',detalle:FLOWS.avaluo.detalle,timeline:[['09/09/2026','Trámite iniciado en Ventanilla Única']]},
  {codigo:FLOWS.exoneracion.expediente,nombre:FLOWS.exoneracion.nombre,fecha:'09/09/2026',estado:'En proceso',tone:'info',unidad:FLOWS.exoneracion.unidad,flow:'exoneracion',detalle:FLOWS.exoneracion.detalle,timeline:[['09/09/2026','Trámite iniciado en Ventanilla Única']]},
  {codigo:'LOJ-2026-004612',nombre:'Permiso de construcción — vivienda unifamiliar',fecha:'18/08/2026',estado:'En revisión',tone:'info',unidad:'Control Municipal',detalle:'Edificación de 180 m² en parroquia Valle. Planos estructurales en revisión técnica.',timeline:[['18/08/2026','Ingreso de planos'],['22/08/2026','Informe de retiros emitido'],['25/08/2026','En revisión estructural']]},
  {codigo:'LOJ-2026-004201',nombre:'Patente municipal 2026',fecha:'02/08/2026',estado:'Aprobado',tone:'',unidad:'Rentas',detalle:'Renovación de patente para comercio minorista en el Centro Histórico.',timeline:[['02/08/2026','Declaración ingresada'],['04/08/2026','Liquidación emitida'],['06/08/2026','Aprobada']]},
  {codigo:'LOJ-2026-003988',nombre:'Certificado de no adeudar al GAD Municipal',fecha:'22/07/2026',estado:'Emitido',tone:'',unidad:'Rentas',detalle:'Certificado de no adeudar tributos municipales. Vigencia 30 días.',timeline:[['22/07/2026','Solicitud'],['22/07/2026','Emitido']]},
  {codigo:'LOJ-2026-003754',nombre:'Autorización de uso y ocupación de suelo',fecha:'15/07/2026',estado:'Observado',tone:'warn',unidad:'Planificación Territorial',detalle:'Observación: el uso solicitado no coincide con la zonificación del predio en San Sebastián. Corregir formulario.',timeline:[['15/07/2026','Ingreso'],['21/07/2026','Observado por zonificación']]},
  {codigo:'LOJ-2026-003410',nombre:'Actualización catastral por traspaso de dominio',fecha:'01/07/2026',estado:'Emitido',tone:'',unidad:'Avalúos y Catastros',detalle:'Cambio de propietario registrado en ficha catastral.',timeline:[['01/07/2026','Solicitud'],['03/07/2026','Emitido']]},
  {codigo:'LOJ-2026-003088',nombre:'Permiso de funcionamiento de establecimiento',fecha:'12/06/2026',estado:'Pagado',tone:'',unidad:'Control Municipal',detalle:'Local comercial en calle Bolívar. Inspección favorable.',timeline:[['12/06/2026','Ingreso'],['18/06/2026','Inspección'],['20/06/2026','Pago registrado']]},
  {codigo:'LOJ-2026-002901',nombre:'Permiso de ocupación de vía pública',fecha:'28/05/2026',estado:'Finalizado',tone:'',unidad:'Obras Públicas',detalle:'Ocupación temporal de acera para cerramiento en El Sagrario. 8 días calendario.',timeline:[['28/05/2026','Solicitud'],['30/05/2026','Autorizado'],['09/06/2026','Finalizado']]},
  {codigo:'LOJ-2026-002744',nombre:'Licencia de publicidad exterior',fecha:'14/05/2026',estado:'En proceso',tone:'info',unidad:'Control Municipal',detalle:'Letrero adosado de 2,40 × 1,20 m en avenida Universitaria. Pendiente informe de imagen urbana.',timeline:[['14/05/2026','Ingreso'],['20/05/2026','Inspección de campo']]},
  {codigo:'LOJ-2026-002510',nombre:'Permiso de demolición menor',fecha:'02/05/2026',estado:'Emitido',tone:'',unidad:'Control Municipal',detalle:'Demolición de cubierta de bloque anexo. Sin afectación a bien patrimonial.',timeline:[['02/05/2026','Solicitud'],['08/05/2026','Emitido']]}
];

const catalogo=[
  {id:'avaluo',nombre:FLOWS.avaluo.nombre,unidad:FLOWS.avaluo.unidad,tiempo:'3 días hábiles',costo:FLOWS.avaluo.costo,flow:'avaluo',desc:'Certifica el avalúo municipal y los datos catastrales vigentes de un predio, según la guía oficial de trámites del Municipio de Loja.',requisitos:['Solicitud al Jefe de Avalúos y Catastros','Cédula','Escrituras inscritas','Certificado del Registro de la Propiedad','Comprobante de impuesto predial']},
  {id:'exoneracion',nombre:FLOWS.exoneracion.nombre,unidad:FLOWS.exoneracion.unidad,tiempo:'8 días hábiles',costo:FLOWS.exoneracion.costo,flow:'exoneracion',desc:'Rebaja del impuesto predial para adultos mayores, según la guía oficial de trámites del Municipio de Loja. Solicitud a la Dirección Financiera.',requisitos:['Solicitud a Dirección Financiera','Cédula','Escrituras inscritas','Comprobante de impuesto predial vigente']},
  {id:'unificacion',nombre:'Rectificación y regularización de excedentes (unificación de lotes)',unidad:'Avalúos y Catastros',tiempo:'8 días hábiles',costo:'$48,50',desc:'Fusiona dos o más predios colindantes del mismo propietario en un solo lote catastral.',requisitos:['Cédula','Escrituras de ambos lotes','Certificado de linderado','Línea de fábrica']},
  {id:'linderado',nombre:'Certificado de linderado',unidad:'Avalúos y Catastros',tiempo:'5 días hábiles',costo:'$18,00',desc:'Describe colindantes, medidas y superficie del predio según catastro.',requisitos:['Cédula','Escritura de dominio','Plano del predio']},
  {id:'subdivision',nombre:'Subdivisión o fraccionamiento de predios',unidad:'Avalúos y Catastros',tiempo:'15 días hábiles',costo:'$65,00',desc:'Divide un predio en dos o más lotes independientes con nueva clave catastral.',requisitos:['Escritura','Plano de subdivisión','Informe de línea de fábrica']},
  {id:'traspaso',nombre:'Actualización catastral por traspaso de dominio',unidad:'Avalúos y Catastros',tiempo:'6 días hábiles',costo:'$15,00',desc:'Registra el cambio de propietario en la ficha catastral municipal.',requisitos:['Escritura inscrita','Cédula del nuevo propietario','Certificado de no adeudar']},
  {id:'lineafabrica',nombre:'Certificado de línea de fábrica',unidad:'Planificación Territorial',tiempo:'7 días hábiles',costo:'$22,00',desc:'Determina retiros, altura y afectaciones del predio frente a la vía pública.',requisitos:['Clave catastral','Escritura','Plano de ubicación']},
  {id:'usosuelo',nombre:'Autorización de uso y ocupación de suelo',unidad:'Planificación Territorial',tiempo:'10 días hábiles',costo:'$30,00',desc:'Verifica que la actividad propuesta sea compatible con la zonificación del sector.',requisitos:['Cédula o RUC','Croquis del local','Línea de fábrica']},
  {id:'planos',nombre:'Aprobación de planos arquitectónicos',unidad:'Planificación Territorial',tiempo:'20 días hábiles',costo:'Según m² de construcción',desc:'Revisión y sello municipal de planos previo al permiso de construcción.',requisitos:['Planos firmados por arquitecto','Línea de fábrica','Escritura']},
  {id:'construccion',nombre:'Permiso de construcción',unidad:'Control Municipal',tiempo:'15 días hábiles',costo:'Según m² de construcción',desc:'Autoriza la edificación nueva, ampliación o remodelación de una obra.',requisitos:['Planos aprobados','Cálculo estructural','Certificado de no adeudar']},
  {id:'funcionamiento',nombre:'Permiso de funcionamiento de establecimiento',unidad:'Control Municipal',tiempo:'8 días hábiles',costo:'$25,00',desc:'Habilita el funcionamiento de locales comerciales y de servicios en el cantón.',requisitos:['Patente municipal','Uso de suelo','Permiso de bomberos']},
  {id:'publicidad',nombre:'Licencia de publicidad exterior',unidad:'Control Municipal',tiempo:'12 días hábiles',costo:'Según dimensiones del rótulo',desc:'Autoriza rótulos, vallas y publicidad visible desde el espacio público.',requisitos:['Diseño y dimensiones','Autorización del propietario','Uso de suelo']},
  {id:'demolicion',nombre:'Permiso de demolición',unidad:'Control Municipal',tiempo:'10 días hábiles',costo:'$28,00',desc:'Autoriza el derrocamiento total o parcial de una edificación.',requisitos:['Escritura','Informe técnico','Plan de manejo de escombros']},
  {id:'patente',nombre:'Patente municipal',unidad:'Rentas',tiempo:'2 días hábiles',costo:'Según patrimonio declarado',desc:'Registro obligatorio de toda actividad económica en el cantón Loja.',requisitos:['RUC','Cédula del representante','Declaración de patrimonio']},
  {id:'noadeudar',nombre:'Certificado de no adeudar al GAD Municipal',unidad:'Rentas',tiempo:'Inmediato',costo:'$3,00',desc:'Acredita que el ciudadano no mantiene obligaciones pendientes con el Municipio.',requisitos:['Cédula','Obligaciones canceladas']},
  {id:'viapublica',nombre:'Permiso de ocupación de vía pública',unidad:'Obras Públicas',tiempo:'4 días hábiles',costo:'$1,50 por m² / día',desc:'Ocupación temporal de aceras o calzada por obra, mudanza o evento.',requisitos:['Cédula','Croquis del área a ocupar','Plazo solicitado']},
  {id:'roturavia',nombre:'Autorización de rotura de vía',unidad:'Obras Públicas',tiempo:'7 días hábiles',costo:'$40,00 + garantía',desc:'Permite romper la calzada para acometidas de agua, alcantarillado o ducteria.',requisitos:['Croquis del tramo','Compromiso de reposición','Garantía']},
  {id:'simert',nombre:'Tarjeta de residente SIMERT',unidad:'Movilidad',tiempo:'3 días hábiles',costo:'$10,00 anual',desc:'Permite el estacionamiento de residentes en zonas tarifadas del centro.',requisitos:['Cédula','Matrícula del vehículo','Planilla de servicio básico']}
];

const catCategorias=['Todas',...catalogo.reduce((acc,t)=>acc.includes(t.unidad)?acc:acc.concat(t.unidad),[])];

const crest=`<svg viewBox="0 0 40 46" role="img" aria-label="Escudo del Municipio de Loja">
  <path d="M20 2 L37 7 V24 C37 33.5 29.5 40.7 20 44 C10.5 40.7 3 33.5 3 24 V7 Z" fill="#A32638"/>
  <path d="M4.2 26 H35.8 C35 33.8 28.4 40.3 20 43.4 C11.6 40.3 5 33.8 4.2 26 Z" fill="#F2E6C4"/>
  <g fill="#D9A526">
    <rect x="10.5" y="10.5" width="5" height="13.5"/>
    <rect x="24.5" y="10.5" width="5" height="13.5"/>
    <rect x="17.2" y="6" width="5.6" height="18"/>
    <rect x="10.5" y="17" width="19" height="7"/>
    <rect x="17.2" y="4.2" width="1.7" height="2"/>
    <rect x="21.1" y="4.2" width="1.7" height="2"/>
    <rect x="10.5" y="8.8" width="1.6" height="1.9"/>
    <rect x="13.9" y="8.8" width="1.6" height="1.9"/>
    <rect x="24.5" y="8.8" width="1.6" height="1.9"/>
    <rect x="27.9" y="8.8" width="1.6" height="1.9"/>
  </g>
  <path d="M18.6 24 V21.2 A1.4 1.4 0 0 1 21.4 21.2 V24 Z" fill="#7A1C29"/>
  <g stroke="#3D6E93" stroke-width="1.7" fill="none" stroke-linecap="round">
    <path d="M9.5 31.5 q3.4 -2.2 6.8 0 t6.8 0 t6.8 0"/>
    <path d="M10.5 36 q3 -2 6 0 t6 0 t6 0"/>
  </g>
  <path d="M20 2 L37 7 V24 C37 33.5 29.5 40.7 20 44 C10.5 40.7 3 33.5 3 24 V7 Z" fill="none" stroke="#D9A526" stroke-width="2.2"/>
</svg>`;

const icons={
  inicio:`<path d="M3.2 10.4 12 3.2l8.8 7.2"/><path d="M5.6 9.4V20.4h12.8V9.4"/><path d="M10 20.4v-5.2h4v5.2"/>`,
  tramites:`<path d="M6 3.2h7.6L18 7.6v13.2H6z"/><path d="M13.4 3.2v4.6H18"/><path d="M9 12.4h6"/><path d="M9 16h6"/>`,
  pagos:`<rect x="3.2" y="5.8" width="17.6" height="12.4"/><path d="M3.2 10h17.6"/><path d="M6.6 14.8h3.6"/>`,
  notificaciones:`<path d="M12 3.2a5.6 5.6 0 0 0-5.6 5.6c0 5-2.1 6.6-2.1 6.6h15.4s-2.1-1.6-2.1-6.6A5.6 5.6 0 0 0 12 3.2z"/><path d="M10.1 18.6a2.1 2.1 0 0 0 3.8 0"/>`,
  participacion:`<circle cx="9.2" cy="7.8" r="3.3"/><path d="M3.2 20.4c0-3.5 2.7-5.9 6-5.9s6 2.4 6 5.9"/><circle cx="17" cy="9.2" r="2.5"/><path d="M16.6 14.7c2.5.3 4.2 2.4 4.2 5.7"/>`
};
function icon(name){return `<svg class="ico-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`}

const faceScan=`<svg class="face-svg" viewBox="0 0 200 190" role="img" aria-label="Ilustración de reconocimiento facial">
  <clipPath id="faceFrame"><rect x="38" y="20" width="124" height="158"/></clipPath>
  <g clip-path="url(#faceFrame)">
    <rect x="88" y="106" width="24" height="38" fill="#DBB88E"/>
    <path d="M44 178c0-24 25-38 56-38s56 14 56 38z" fill="#2B5170"/>
    <path d="M84 141l16 23 16-23c-5-1-10-1.5-16-1.5s-11 .5-16 1.5z" fill="#F7F3E8"/>
    <ellipse cx="100" cy="78" rx="36" ry="40" fill="#33251C"/>
    <circle cx="68" cy="92" r="6" fill="#DBB88E"/>
    <circle cx="132" cy="92" r="6" fill="#DBB88E"/>
    <ellipse cx="100" cy="88" rx="31" ry="36" fill="#F1DAB8"/>
    <path d="M85 79q7-4.5 14-.5" stroke="#33251C" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M101 78.5q7-4 14 .5" stroke="#33251C" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="90" cy="88" rx="6" ry="3.6" fill="#FFFDF7"/>
    <ellipse cx="110" cy="88" rx="6" ry="3.6" fill="#FFFDF7"/>
    <circle cx="90" cy="88" r="2.6" fill="#3B2C22"/>
    <circle cx="110" cy="88" r="2.6" fill="#3B2C22"/>
    <path d="M100 91v9q0 3 3.5 3" stroke="#D9B387" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M92 111q8 6 16 0" stroke="#B36A5E" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  </g>
  <g fill="#D9A526">
    <circle cx="90" cy="88" r="1.8"/><circle cx="110" cy="88" r="1.8"/><circle cx="100" cy="101" r="1.8"/>
    <circle cx="92" cy="111" r="1.8"/><circle cx="108" cy="111" r="1.8"/><circle cx="100" cy="122" r="1.8"/>
    <circle cx="72" cy="80" r="1.8"/><circle cx="128" cy="80" r="1.8"/>
  </g>
  <g stroke="#D9A526" stroke-width="0.9" opacity="0.4" fill="none">
    <path d="M72 80 90 88 100 101 110 88 128 80"/><path d="M92 111 100 122 108 111"/>
  </g>
  <rect class="scan" x="52" y="30" width="96" height="2.5" fill="#D9A526" opacity="0.75"/>
  <g stroke="#D9A526" stroke-width="2.4" fill="none" stroke-linecap="round">
    <path d="M52 48V32h16"/><path d="M132 32h16v16"/><path d="M52 150v16h16"/><path d="M132 166h16v-16"/>
  </g>
</svg>`;

const flagbar=`<div class="flagbar"><span></span><span></span><span></span><span></span><span></span></div>`;
const protobadge=`<div class="protobadge">PROTOTIPO — <b>datos ficticios</b>, sin conexión a sistemas municipales reales. Demostración visual, no funcional.</div>`;

function esc(s){return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

function countEstado(s){
  return misTramites.filter(t=>t.estado===s).length;
}

function docsCount(){
  return requiredDocs().filter(d=>state.uploads[d.id]).length;
}

function docsOk(){
  return requiredDocs().every(d=>state.uploads[d.id]);
}

function titular(){
  const f=state.form;
  return [f.nombres,f.apellido1,f.apellido2].filter(Boolean).join(' ');
}

function predioDeclarado(){
  return (state.form.numeroPredial||'').trim()||'01-02-03-0405';
}

function predioComprobante(){
  const declared=predioDeclarado();
  const m=declared.match(/^(.*?)(\d+)(\D*)$/);
  if(!m)return '01-02-03-0418';
  const n=String(Number(m[2])+13).padStart(m[2].length,'0');
  const result=m[1]+n+m[3];
  return result===declared?'01-02-03-0418':result;
}

function resetListed(id){
  const fl=FLOWS[id];
  const t=misTramites.find(x=>x.flow===id);
  if(fl&&t){
    t.estado='En proceso';
    t.tone='info';
    t.detalle=fl.detalle;
    t.timeline=[['09/09/2026','Trámite iniciado en Ventanilla Única']];
  }
}

function addEvent(ev){
  if(state.timeline.some(x=>x[1]===ev))return;
  state.timeline.push(['09/09/2026',ev]);
}

function render(){if(!state.logged)return login(); shell();}

function login(){app.innerHTML=`${flagbar}${protobadge}<div class="login"><div class="login-card"><div class="login-left"><div class="logo">${crest}</div><h1>Ventanilla Única Digital</h1><p class="muted">Mi Loja — prototipo demostrativo</p><label>Identificación</label><input id="ced" class="input" value="1104567890"><label>Contraseña</label><input class="input" type="password" value="demo2026"><button class="btn primary full" onclick="enter()">Ingresar</button><button class="btn secondary full" onclick="faceLogin()">Ingresar con reconocimiento facial</button><p class="muted mono" style="font-size:11.5px;margin-top:20px">Demo sin backend: cualquier dato sirve. No se almacenan datos reales.</p></div><div class="login-right"><div class="veil" aria-hidden="true"></div><h2>Una sola puerta de entrada</h2><p>Trámites, pagos, notificaciones y participación ciudadana en un mismo espacio.</p><div class="face">${faceScan}</div><strong>Reconocimiento facial (simulado)</strong><p>La cámara no se activa. La validación es una animación local.</p></div></div></div>`}

function enter(){state.logged=true;render()}

function faceLogin(){document.querySelector('.login-right strong').textContent='Verificando identidad…';document.querySelector('.face').classList.add('scanning');setTimeout(()=>{state.logged=true;render()},1400)}

function shell(){app.innerHTML=`${flagbar}${protobadge}<div class="top"><div class="brand"><span class="crest">${crest}</span>Mi Loja <span class="badge">DEMO</span></div><div class="userbox"><span>${fakeUser.name}</span><button class="btn ghost" style="padding:7px 14px" onclick="logout()">Salir</button></div></div><div class="container"><div class="nav">${nav()}</div><div id="content" class="content"></div></div><div class="footer">Prototipo conceptual de “Mi Loja” · Datos ficticios · <b>Municipio de Loja</b></div>`;content();}

function nav(){return sections.map(([id,label])=>`<button class="${state.section===id?'active':''}" onclick="go('${id}')">${icon(id)}${label}</button>`).join('')}

function go(s){state.section=s;state.tramite=null;state.catalogMsg=null;const n=document.querySelector('.nav');if(n)n.innerHTML=nav();content()}

function content(){
  const c=document.getElementById('content');
  if(!c)return;
  if(state.section==='inicio')c.innerHTML=home();
  if(state.section==='tramites')c.innerHTML=tramites();
  if(state.section==='pagos')c.innerHTML=pagos();
  if(state.section==='notificaciones')c.innerHTML=notifications();
  if(state.section==='participacion')c.innerHTML=participation();
  const box=document.getElementById('chatMsgs');
  if(box)box.scrollTop=box.scrollHeight;
}

function hero(lbl,title,sub,action){return `<div class="hero"><div><span class="lbl">${lbl}</span><h1>${title}</h1><p class="muted">${sub}</p></div>${action||''}</div>`}

function home(){
  const a=misTramites.find(t=>t.flow==='avaluo');
  const e=misTramites.find(t=>t.flow==='exoneracion');
  return `${hero('Espacio ciudadano','Buenos días, '+fakeUser.name.split(' ')[0],'Este es tu espacio ciudadano digital.','<button class="btn primary" onclick="newTramite()">Crear nuevo trámite</button>')}
  <div class="grid">
    <div class="card stat"><span class="ico">${icon('tramites')}</span><h3>Mis trámites</h3><div class="big">${countEstado('En proceso')+countEstado('En orientación')}</div><p class="muted">En proceso</p></div>
    <div class="card stat"><span class="ico">${icon('pagos')}</span><h3>Mis pagos</h3><div class="big">${state.paid?0:1}</div><p class="muted">${state.paid?'Al día':'Pendiente'}</p></div>
    <div class="card stat"><span class="ico">${icon('notificaciones')}</span><h3>Notificaciones</h3><div class="big">3</div><p class="muted">Nuevas</p></div>
    <div class="card stat"><span class="ico">${icon('participacion')}</span><h3>Participación</h3><div class="big">2</div><p class="muted">Consultas abiertas</p></div>
  </div>
  <div class="card"><h2><span class="sq"></span> Actividad reciente</h2>
    <div class="list" style="margin-top:16px">
      <div class="list-item"><span>${esc(FLOWS.avaluo.nombre)} — <span class="mono">${FLOWS.avaluo.expediente}</span></span><span class="status ${a&&a.tone||''}">${a?a.estado:'En proceso'}</span></div>
      <div class="list-item"><span>${esc(FLOWS.exoneracion.nombre)} — <span class="mono">${FLOWS.exoneracion.expediente}</span></span><span class="status ${e&&e.tone||''}">${e?e.estado:'En proceso'}</span></div>
      <div class="list-item"><span>Certificado de no adeudar</span><span class="status">Emitido</span></div>
    </div>
  </div>`;
}

function tramites(){
  if(state.tramite==='catalogo')return catalogoView();
  if(isDemo())return tramiteView();
  if(state.tramite&&String(state.tramite).startsWith('consulta:'))return consultaView(state.tramite.slice(9));
  const rows=misTramites.map(t=>`<tr>
    <td class="code">${t.codigo}</td>
    <td>${esc(t.nombre)}</td>
    <td>${t.unidad}</td>
    <td>${t.fecha}</td>
    <td><span class="status ${t.tone}">${t.estado}</span></td>
    <td><button class="btn secondary" onclick="openListed('${t.codigo}')">Ver</button></td>
  </tr>`).join('');
  return `${hero('Expedientes','Mis trámites',misTramites.length+' expedientes típicos del GAD Municipal de Loja. Datos ficticios.','<button class="btn primary" onclick="newTramite()">Crear nuevo trámite</button>')}
  <div class="card flush">
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Código</th><th>Trámite</th><th>Unidad</th><th>Fecha</th><th>Estado</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="scroll-hint">Desliza la tabla para ver más columnas →</p>
  </div>`;
}

function consultaView(codigo){
  const t=misTramites.find(x=>x.codigo===codigo);
  if(!t){state.tramite=null;return tramites();}
  const tl=(t.timeline||[]).map(([d,ev])=>`<div class="list-item"><span>${esc(ev)}</span><span class="muted mono">${d}</span></div>`).join('');
  return `${hero('Expediente',t.nombre,t.codigo+' · '+t.unidad+' · datos ficticios','<button class="btn ghost" onclick="state.tramite=null;content()">← Volver</button>')}
  <div class="card">
    <p><span class="status ${t.tone}">${t.estado}</span> · Ingreso ${t.fecha}</p>
    <p style="margin-top:12px">${esc(t.detalle)}</p>
    <p class="muted" style="margin-top:10px">Este expediente es de consulta. Los flujos demostrativos completos están en ${esc(FLOWS.avaluo.nombre)} y ${esc(FLOWS.exoneracion.nombre)}.</p>
    <h3 style="margin-top:22px">Seguimiento</h3>
    <div class="list" style="margin-top:10px">${tl}</div>
  </div>`;
}

function newTramite(){
  state.tramite='catalogo';
  state.catalogQuery='';
  state.catalogCat='Todas';
  state.catalogMsg=null;
  state.section='tramites';
  const n=document.querySelector('.nav');
  if(n)n.innerHTML=nav();
  content();
}

function catalogoFiltrado(){
  const q=state.catalogQuery.trim().toLowerCase();
  return catalogo.filter(t=>{
    const cat=state.catalogCat==='Todas'||t.unidad===state.catalogCat;
    const txt=!q||(t.nombre+' '+t.unidad+' '+t.desc).toLowerCase().includes(q);
    return cat&&txt;
  });
}

function catalogoCards(){
  const list=catalogoFiltrado();
  if(!list.length)return `<div class="card"><h3>Sin resultados</h3><p class="muted">No encontramos trámites que coincidan con la búsqueda. Pruebe con otra palabra o cambie la unidad.</p></div>`;
  return `<div class="grid two">${list.map(t=>`<div class="card cat-card${t.flow?' demo':''}">
    <span class="lbl">${esc(t.unidad)}</span>
    <h3>${esc(t.nombre)}</h3>
    <p class="muted">${esc(t.desc)}</p>
    <div class="cat-meta">
      <span class="file-chip">⏱ ${esc(t.tiempo)}</span>
      <span class="file-chip">${esc(t.costo)}</span>
      ${t.flow==='avaluo'?'<span class="status info">Escenario 1 · sin observaciones</span>':''}
      ${t.flow==='exoneracion'?'<span class="status warn">Escenario 2 · con asistencia</span>':''}
    </div>
    <p class="field-note" style="margin:12px 0 0">Requisitos: ${t.requisitos.map(r=>esc(r)).join(' · ')}</p>
    <div class="btn-row">
      <button class="btn ${t.flow?'primary':'secondary'}" onclick="startTramite('${t.id}')">${t.flow?'Iniciar trámite':'Seleccionar'}</button>
    </div>
  </div>`).join('')}</div>`;
}

function catalogoView(){
  const chips=catCategorias.map(c=>`<button class="${state.catalogCat===c?'active':''}" onclick="setCatalogCat('${esc(c)}')">${esc(c)}</button>`).join('');
  return `${hero('Nuevo trámite','Seleccione el trámite que desea iniciar',catalogo.length+' trámites disponibles en la Ventanilla Única Digital. Datos ficticios.','<button class="btn ghost" onclick="state.tramite=null;content()">← Volver a mis trámites</button>')}
  <div class="card">
    <div class="field"><label for="catQ">Buscar trámite</label><input id="catQ" class="input" placeholder="Ej.: avalúo, exoneración, patente" value="${esc(state.catalogQuery)}" oninput="filterCatalogo(this.value)"></div>
    <div class="cat-filters">${chips}</div>
  </div>
  <div id="catList" style="margin-top:18px">${catalogoCards()}</div>
  ${state.catalogMsg?catalogoModal():''}`;
}

function catalogoModal(){
  return `<div class="modal" onclick="closeCatalogMsg()"><div class="modal-card" onclick="event.stopPropagation()">
    <span class="lbl">Prototipo</span>
    <h2>${esc(state.catalogMsg)}</h2>
    <p style="margin-top:10px">Este trámite está publicado en el catálogo, pero su formulario aún no se encuentra desarrollado en esta demostración.</p>
    <div class="notice">Hay dos flujos demostrativos: <b>${esc(FLOWS.avaluo.nombre)}</b> (sin observaciones) y <b>${esc(FLOWS.exoneracion.nombre)}</b> (inconsistencia y sala de orientación).</div>
    <div class="btn-row">
      <button class="btn primary" onclick="startTramite('avaluo')">Escenario 1</button>
      <button class="btn secondary" onclick="startTramite('exoneracion')">Escenario 2</button>
      <button class="btn ghost" onclick="closeCatalogMsg()">Elegir otro trámite</button>
    </div>
  </div></div>`;
}

function filterCatalogo(value){
  state.catalogQuery=value;
  const box=document.getElementById('catList');
  if(box)box.innerHTML=catalogoCards();
}

function setCatalogCat(cat){
  state.catalogCat=cat;
  content();
  const input=document.getElementById('catQ');
  if(input){input.focus();input.setSelectionRange(input.value.length,input.value.length);}
}

function closeCatalogMsg(){
  state.catalogMsg=null;
  content();
}

function startTramite(id){
  const t=catalogo.find(x=>x.id===id);
  if(!t)return;
  if(t.flow){startFlow(t.flow);return;}
  state.catalogMsg=t.nombre;
  content();
}

function startFlow(id){
  const fl=FLOWS[id];
  if(!fl)return;
  reviewSeq+=1;
  salaSeq+=1;
  state.tramite=id;
  state.step=1;
  state.paid=false;
  state.reviewed=false;
  state.reviewing=false;
  state.observed=false;
  state.helpRequested=false;
  state.salaPhase=null;
  state.asesorHabla=false;
  state.zoomMic=true;
  state.zoomCam=true;
  state.reviewItems=[];
  state.reviewTotal=0;
  state.form=defaultForm(id);
  state.uploads=emptyDocs(id);
  state.chat=welcomeChat(id);
  state.helpChat=[];
  state.timeline=[['09/09/2026','Trámite iniciado en Ventanilla Única']];
  state.catalogMsg=null;
  state.section='tramites';
  resetListed(id);
  const n=document.querySelector('.nav');
  if(n)n.innerHTML=nav();
  content();
}

function openListed(codigo){
  const t=misTramites.find(x=>x.codigo===codigo);
  if(t&&t.flow&&FLOWS[t.flow]){state.tramite=t.flow;content();return;}
  state.tramite='consulta:'+codigo;
  content();
}

function tramiteView(){
  const fl=flow();
  const labels=fl.steps;
  return `${hero('Trámite en curso',fl.nombre,'Expediente '+fl.expediente+' · '+fl.unidad+' · datos ficticios','<button class="btn ghost" onclick="state.tramite=null;content()">← Volver</button>')}
  <div class="steps">${labels.map((label,i)=>{const n=i+1;return `<div class="step ${state.step===n?'active':''} ${state.step>n?'done':''}"><span class="n">PASO ${n}</span>${label}</div>`}).join('')}</div>
  ${stepContent()}`;
}

function options(list,current){
  return `<option value="">Seleccione…</option>`+list.map(v=>`<option value="${esc(v)}" ${current===v?'selected':''}>${esc(v)}</option>`).join('');
}

function field(id,label,value,extra='',placeholder=''){
  return `<div class="field ${extra}"><label for="${id}">${label}</label><input id="${id}" class="input" value="${esc(value)}" placeholder="${esc(placeholder)}" oninput="state.form.${id}=this.value"></div>`;
}

function fieldRO(id,label,value){
  return `<div class="field"><label for="${id}">${label}</label><input id="${id}" class="input" value="${esc(value)}" readonly></div>`;
}

function formSolicitud(){
  const f=state.form;
  const fl=flow();
  const exo=fl.id==='exoneracion';
  return `<div class="card">
    <h2>Paso 1 — Solicitud</h2>
    <p class="muted">${exo?'Solicitud para trámites administrativos dirigida a la Dirección Financiera, según la guía oficial de exoneración de tercera edad.':'Solicitud dirigida al Jefe de Avalúos y Catastros.'} Complete los datos del predio. La información personal se cargó desde el perfil de María Fernanda Torres.</p>
    <div class="form-block">
      <h3>Datos personales</h3>
      <p class="field-note">Precargados · no editables en este prototipo · cédula, teléfono y correo constan en la solicitud</p>
      <div class="form-grid">
        <div class="field span-2"><label for="destino">Dirigido a</label><input id="destino" class="input" value="${esc(f.destino)}" readonly></div>
        ${exo?fieldRO('tipoExoneracion','Tipo de exoneración',f.tipoExoneracion):''}
        ${fieldRO('nombres','Nombres',f.nombres)}
        ${fieldRO('apellido1','Primer apellido',f.apellido1)}
        ${fieldRO('apellido2','Segundo apellido',f.apellido2)}
        ${fieldRO('cedula','Cédula de ciudadanía',f.cedula)}
        ${fieldRO('email','Correo electrónico',f.email)}
        ${fieldRO('telefono','Teléfono convencional',f.telefono)}
        ${fieldRO('celular','Celular',f.celular)}
        <div class="field span-2"><label for="domicilio">Dirección domiciliaria</label><input id="domicilio" class="input" value="${esc(f.domicilio)}" readonly></div>
      </div>
    </div>
    <div class="form-block">
      <h3>Datos del predio</h3>
      <p class="field-note">Campos que debe llenar la solicitante</p>
      <div class="form-grid">
        <div class="field"><label for="parroquia">Parroquia</label><select id="parroquia" class="input" onchange="state.form.parroquia=this.value">${options(parroquias,f.parroquia)}</select></div>
        ${field('barrio','Barrio o sector',f.barrio,'','San Sebastián')}
        <div class="field"><label for="tipoPredio">Tipo de predio</label><select id="tipoPredio" class="input" onchange="state.form.tipoPredio=this.value">${options(tiposPredio,f.tipoPredio)}</select></div>
        ${exo?'':`<div class="field"><label for="uso">Uso actual del suelo</label><select id="uso" class="input" onchange="state.form.uso=this.value">${options(usosSuelo,f.uso)}</select></div>`}
        ${field('claveCatastral','Clave catastral',f.claveCatastral,'','1101500102030405')}
        ${field('numeroPredial','Número predial',f.numeroPredial,'','01-02-03-0405')}
        ${field('direccionPredio','Dirección del predio',f.direccionPredio,'span-2',exo?'Calle Mercadillo 08-21 y 18 de Noviembre':'Calle Mercadillo 10-34 y 10 de Agosto')}
        ${exo?'':field('area','Área de terreno (m²)',f.area,'','312,50')}
        <div class="field span-2"><label for="motivo">Motivo de la solicitud</label><textarea id="motivo" class="input" rows="3" placeholder="${exo?'Solicito la exoneración del impuesto predial por tercera edad sobre el predio de mi propiedad.':'Ej.: trámite hipotecario, compraventa, actualización de datos catastrales'}" oninput="state.form.motivo=this.value">${esc(f.motivo)}</textarea></div>
      </div>
    </div>
    <div class="btn-row">
      <button class="btn primary" onclick="submitSolicitud()">Guardar solicitud y continuar</button>
    </div>
  </div>`;
}

function submitSolicitud(){
  if(!formOk()){
    botSay(flow().id==='exoneracion'
      ?'Para continuar complete parroquia, barrio, tipo de predio, clave catastral, número predial, dirección y el motivo de la exoneración.'
      :'Para continuar complete parroquia, barrio, tipo de predio, uso del suelo, clave catastral, número predial, dirección, área y el motivo de la solicitud.');
    return;
  }
  addEvent('Solicitud dirigida a '+flow().destino.split('—')[0].trim());
  botSay('Solicitud registrada. Constan cédula, teléfono y correo, como pide la guía oficial. Continúe con la carga de documentos.');
  nextStep();
}

function docSlot(doc){
  const file=state.uploads[doc.id];
  return `<div class="doc-slot ${file?'ok':''}">
    <strong>${esc(doc.label)}</strong>
    <p class="muted">${esc(doc.hint)}</p>
    <label class="drop">
      <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onchange="uploadDoc('${doc.id}',this)">
      <strong>${file?'Reemplazar archivo':'Adjuntar documento'}</strong>
      <span class="muted">PDF, imagen o Word — simulación local</span>
    </label>
    ${file?`<p class="file-chip" style="margin-top:10px">${esc(file.name)} · ${esc(file.size)}</p>`:'<p class="muted" style="margin-top:10px">Pendiente</p>'}
  </div>`;
}

function docsView(){
  const docs=requiredDocs();
  return `<div class="card">
    <h2>Paso 2 — Documentos</h2>
    <p>Adjunte los requisitos oficiales. El revisor simulará la lectura de cada archivo. Nada se envía a un servidor.</p>
    <p class="field-note">Requisitos de la guía de trámites del Municipio de Loja</p>
    <div class="doc-grid">${docs.map(docSlot).join('')}</div>
    <p class="muted" style="margin-top:14px">${docsCount()} de ${docs.length} documentos cargados.</p>
    <div class="btn-row">
      <button class="btn ghost" onclick="state.step=1;content()">← Volver a la solicitud</button>
      <button class="btn primary" onclick="submitDocs()" ${docsOk()?'':'disabled'}>Enviar a revisión de la IA</button>
    </div>
  </div>`;
}

function submitDocs(){
  if(!docsOk()){
    botSay('Faltan documentos. Adjunte todos los requisitos oficiales de este trámite.');
    return;
  }
  addEvent('Documentos cargados según requisitos oficiales');
  botSay(flow().scenario==='inconsistencia'
    ?'Documentación completa. Pasaré al cruce de formulario y archivos. Si hay una inconsistencia, podrá pedir ayuda humana.'
    :'Documentación completa. Pasaré al cruce de formulario y archivos. Si no hay inconsistencias, habilitaré el pago del derecho de certificación.');
  nextStep();
}

function okItem(text){return {ok:true,text};}
function badItem(text){return {ok:false,text};}

function reviewFindings(){
  const f=state.form;
  const fl=flow();
  const fileOf=id=>state.uploads[id]?.name||id;
  if(fl.scenario==='inconsistencia'){
    return [
      okItem(`Solicitud dirigida a la Dirección Financiera. Constan cédula ${f.cedula}, teléfono ${f.celular} y correo ${f.email}.`),
      okItem(`Identificación «${fileOf('cedula')}»: coincide con ${titular()}, cédula ${f.cedula}. Documento legible.`),
      okItem(`Escrituras «${fileOf('escrituras')}»: inscritas en el Registro de la Propiedad. Titularidad a nombre de ${titular()}.`),
      okItem(`Comprobante predial «${fileOf('predial')}»: documento vigente y legible. Se extrae el número predial ${predioComprobante()}.`),
      badItem(`Inconsistencia: el número predial de la solicitud es ${predioDeclarado()} y el del comprobante es ${predioComprobante()}. No coinciden. El trámite no puede continuar sin asistencia.`)
    ];
  }
  return [
    okItem(`Solicitud dirigida al Jefe de Avalúos y Catastros. Constan cédula ${f.cedula}, teléfono ${f.celular} y correo ${f.email}.`),
    okItem(`Identificación «${fileOf('cedula')}»: coincide con ${titular()}, cédula ${f.cedula}. Documento legible.`),
    okItem(`Escrituras «${fileOf('escrituras')}»: inscritas en el Registro de la Propiedad de Loja. Titularidad a nombre de ${titular()}. Clave catastral ${f.claveCatastral} coincidente.`),
    okItem(`Certificado del Registro de la Propiedad «${fileOf('registro')}»: historiado y linderado vigente. Sin gravámenes que impidan certificar el predio.`),
    okItem(`Comprobante de impuesto predial «${fileOf('predial')}»: predio ${f.tipoPredio.toLowerCase()} en ${f.direccionPredio}, parroquia ${f.parroquia}, al día en el ejercicio vigente.`),
    okItem(`Cruce de datos: parroquia, dirección, área ${f.area} m² y clave ${f.claveCatastral} coinciden entre formulario, escrituras, certificado del Registro y predial.`)
  ];
}

function mismatchBoxes(){
  return `<div class="mismatch">
    <div class="box"><span class="field-note">Número predial en la solicitud</span><p class="mono">${esc(predioDeclarado())}</p></div>
    <div class="box warn"><span class="field-note">Número predial en el comprobante</span><p class="mono">${esc(predioComprobante())}</p></div>
  </div>`;
}

function reviewView(){
  const fl=flow();
  const exo=fl.scenario==='inconsistencia';
  const items=state.reviewItems.map(it=>`<li class="review-item ${it.ok?'':'bad'}"><span class="mark" aria-hidden="true">${it.ok?'✓':'!'}</span><span>${esc(it.text)}</span></li>`).join('');
  const pending=state.reviewing&&state.reviewItems.length<state.reviewTotal;
  return `<div class="card">
    <h2>Paso 3 — Revisión de la IA</h2>
    <p>${exo?'El revisor cruza la solicitud con cédula, escrituras y el comprobante predial. En este escenario detectará una inconsistencia.':'El revisor cruza la solicitud con los cuatro documentos oficiales. En esta demostración el escenario es el happy path: no hay inconsistencias.'}</p>
    ${!state.reviewed&&!state.reviewing?`<div class="notice">Aún no se ha ejecutado la revisión.</div>`:''}
    ${state.reviewing?`<p class="muted">Contrastando formulario y documentos…</p>`:''}
    <ul class="review-list">${items}${pending?`<li class="review-item typing"><span class="mark">…</span><span>Revisando el siguiente requisito…</span></li>`:''}</ul>
    ${state.reviewed&&!state.observed?`<div class="notice ok"><b>Sin inconsistencias.</b> El expediente es coherente. Queda habilitado el pago del derecho de certificación (${fl.costo}).</div>`:''}
    ${state.observed?`<div class="notice bad"><b>Inconsistencia detectada.</b> El número predial de la solicitud no coincide con el del comprobante de impuesto predial. El trámite queda observado.</div>${mismatchBoxes()}`:''}
    <div class="btn-row">
      <button class="btn ghost" onclick="state.step=2;content()">← Volver a documentos</button>
      ${state.observed
        ?`<button class="btn primary" onclick="pedirAyuda()">Necesito ayuda</button>`
        :state.reviewed
          ?`<button class="btn primary" onclick="enablePago()">Continuar al pago</button>`
          :`<button class="btn primary" onclick="startReview()" ${state.reviewing?'disabled':''}>${state.reviewing?'Revisando…':'Solicitar revisión de la IA'}</button>`}
    </div>
  </div>`;
}

function startReview(){
  if(!formOk()){
    botSay('La solicitud está incompleta. Vuelva al paso 1 y complete los datos del predio.');
    return;
  }
  if(!docsOk()){
    botSay('Faltan documentos. Vuelva al paso 2 y adjunte los requisitos oficiales.');
    return;
  }
  const fl=flow();
  const seq=++reviewSeq;
  state.reviewing=true;
  state.reviewed=false;
  state.observed=false;
  state.reviewItems=[];
  const findings=reviewFindings();
  state.reviewTotal=findings.length;
  content();
  botSay('Inicié el cruce de la solicitud con los documentos adjuntos.');
  findings.forEach((item,i)=>{
    setTimeout(()=>{
      if(seq!==reviewSeq)return;
      state.reviewItems.push(item);
      content();
    },850*(i+1));
  });
  setTimeout(()=>{
    if(seq!==reviewSeq)return;
    state.reviewing=false;
    state.reviewed=true;
    if(fl.scenario==='inconsistencia'){
      state.observed=true;
      addEvent('Revisión de IA: inconsistencia entre número predial y comprobante');
      content();
      botSay('Encontré una diferencia: la solicitud declara el predio '+predioDeclarado()+' y el comprobante corresponde al '+predioComprobante()+'. No puedo continuar sola. Pulse Necesito ayuda para entrar a una videollamada con la Lcda. Patricia Cueva.');
    }else{
      addEvent('Revisión de IA: sin inconsistencias');
      content();
      botSay('Confirmado: no existen inconsistencias entre el formulario y los documentos. Habilité el pago del derecho de certificación.');
    }
  },850*(findings.length+1));
}

function pedirAyuda(){
  if(!state.observed)return;
  state.helpRequested=true;
  addEvent('Solicitud de asistencia '+flow().ticket);
  addEvent('Ingreso a sala de videollamada con '+ASESOR.nombre);
  const t=misTramites.find(x=>x.flow==='exoneracion');
  if(t){
    t.estado='En orientación';
    t.tone='info';
    t.detalle='En videollamada de asistencia. Lcda. Patricia Cueva atiende el expediente y la inconsistencia detectada por la IA.';
    t.timeline=state.timeline.slice();
  }
  const seq=++salaSeq;
  state.step=4;
  state.salaPhase='uniendo';
  state.asesorHabla=false;
  state.zoomMic=true;
  state.zoomCam=true;
  content();
  setTimeout(()=>{
    if(seq!==salaSeq)return;
    state.salaPhase='asesor';
    state.asesorHabla=true;
    state.helpChat=[{role:'bot',text:'Buenos días, María Fernanda. Soy Patricia Cueva, de Rentas. Ya estoy con usted en la sala y tengo su expediente en pantalla: la IA encontró que el número predial de la solicitud es '+predioDeclarado()+' y el del comprobante es '+predioComprobante()+'. Dígame cuál es el correcto y lo resolvemos juntas.'}];
    addEvent('Lcda. Patricia Cueva en sala, con el expediente completo');
    const item=misTramites.find(x=>x.flow==='exoneracion');
    if(item)item.timeline=state.timeline.slice();
    content();
    setTimeout(()=>{if(seq===salaSeq){state.asesorHabla=false;content();}},4200);
  },1600);
}

function enablePago(){
  if(!state.reviewed||state.observed){
    botSay('El pago solo se habilita si la revisión termina sin observaciones.');
    return;
  }
  nextStep();
}

function pagoView(){
  const unlocked=state.reviewed&&!state.observed;
  return `<div class="card">
    <h2>Paso 4 — Pago</h2>
    <p>Derecho de certificación (concepto de la guía oficial de trámites). Valor ficticio: <strong>${flow().costo}</strong></p>
    <div class="notice">Demo: ningún pago real será procesado. No hay pasarela ni backend.</div>
    ${!unlocked?`<div class="notice">El pago permanece bloqueado hasta que la IA confirme que no hay inconsistencias.</div>`:''}
    ${state.paid
      ?`<span class="status">Pago simulado registrado — REC-2026-09114</span>
        <p class="muted" style="margin-top:12px">El derecho de certificación quedó liquidado. Ya puede presentar el expediente.</p>
        ${reciboPago()}
        <div class="btn-row"><button class="btn primary" onclick="presentarExpediente()">Presentar expediente</button></div>`
        :`<button class="btn primary" onclick="pay()" ${unlocked?'':'disabled'}>Registrar pago ${flow().costo}</button>`}
  </div>`;
}

function reciboPago(){
  return `<div class="pdf">
    <div class="pdf-head"><b>MUNICIPIO DE LOJA</b>Recaudaciones · Documento electrónico DEMO · REC-2026-09114</div>
    <h3>Comprobante de pago — Derecho de certificación</h3>
    <p><b>Contribuyente:</b> ${esc(titular())}</p>
    <p><b>Cédula:</b> ${fakeUser.cedula}</p>
    <p><b>Trámite:</b> ${esc(flow().nombre)}</p>
    <p><b>Expediente:</b> ${flow().expediente}</p>
    <p><b>Valor:</b> ${flow().costo}</p>
    <p class="muted mono" style="font-size:12px">09/09/2026 · 10:18 · Firma electrónica simulada</p>
  </div>`;
}

function pay(){
  if(!state.reviewed){
    botSay('El pago no está habilitado. La IA debe confirmar primero que no hay inconsistencias.');
    return;
  }
  state.paid=true;
  addEvent('Pago del derecho de certificación registrado');
  content();
  botSay('Pago registrado. Comprobante REC-2026-09114. Ya puede presentar el expediente para la emisión del certificado.');
}

function presentarExpediente(){
  if(!state.paid){
    botSay('Registre el pago antes de presentar el expediente.');
    return;
  }
  addEvent('Expediente presentado');
  addEvent('Certificado de Avalúos y Catastros emitido');
  const t=misTramites.find(x=>x.flow==='avaluo');
  if(t){
    t.estado='Emitido';
    t.tone='';
    t.detalle='Certificado emitido. Avalúo comercial referencial USD 134.600,00. Datos ficticios.';
    t.timeline=state.timeline.slice();
  }
  nextStep();
  botSay('Expediente presentado. El certificado quedó incorporado. Recuerde que este documento es una simulación y no tiene validez municipal.');
}

function expedienteView(){
  const f=state.form;
  const docs=requiredDocs().map(d=>{
    const file=state.uploads[d.id];
    return `<div class="list-item"><span>${esc(d.label)}<br><span class="muted">${file?esc(file.name):'—'}</span></span><span class="status">Anexo</span></div>`;
  }).join('');
  const tl=state.timeline.map(([d,ev])=>`<div class="list-item"><span>${esc(ev)}</span><span class="muted mono">${d}</span></div>`).join('');
  return `<div class="card">
    <h2>Paso 5 — Expediente</h2>
    <p><span class="status">Emitido</span> · ${flow().expediente} · Dirección de Avalúos y Catastros</p>
    <p style="margin-top:10px">Solicitud, documentos, revisión de IA y pago del derecho de certificación constan en el expediente. Datos ficticios, sin backend.</p>
    <div class="meta-grid">
      <div><span class="field-note">Solicitante</span><p>${esc(titular())}</p></div>
      <div><span class="field-note">Cédula</span><p>${esc(f.cedula)}</p></div>
      <div><span class="field-note">Predio</span><p>${esc(f.direccionPredio)}</p></div>
      <div><span class="field-note">Clave catastral</span><p class="mono">${esc(f.claveCatastral)}</p></div>
    </div>
    <h3 style="margin-top:22px">Seguimiento</h3>
    <div class="list" style="margin-top:10px">${tl}</div>
    <h3 style="margin-top:22px">Documentos del expediente</h3>
    <div class="list" style="margin-top:10px">${docs}</div>
    ${reciboPago()}
    ${certificadoAvaluo()}
    <div class="btn-row">
      <button class="btn secondary" onclick="window.print()">Imprimir / Guardar como PDF</button>
      <button class="btn ghost" onclick="finish()">Volver a mis trámites</button>
    </div>
  </div>`;
}

function certificadoAvaluo(){
  const f=state.form;
  return `<div class="pdf">
    <div class="pdf-head"><b>MUNICIPIO DE LOJA</b>Dirección de Avalúos y Catastros · Documento electrónico DEMO · CAC-2026-03102</div>
    <h3>${esc(flow().nombre)}</h3>
    <p>El GAD Municipal del cantón Loja certifica, para los fines legales pertinentes, los siguientes datos catastrales y de avalúo — <b>simulación sin validez</b>.</p>
    <div class="meta-grid">
      <div><span class="field-note">Propietario</span><p>${esc(titular())}</p></div>
      <div><span class="field-note">Cédula</span><p>${esc(f.cedula)}</p></div>
      <div><span class="field-note">Parroquia / barrio</span><p>${esc(f.parroquia)} · ${esc(f.barrio)}</p></div>
      <div><span class="field-note">Tipo / uso</span><p>${esc(f.tipoPredio)} · ${esc(f.uso)}</p></div>
      <div><span class="field-note">Clave catastral</span><p class="mono">${esc(f.claveCatastral)}</p></div>
      <div><span class="field-note">Número predial</span><p class="mono">${esc(f.numeroPredial)}</p></div>
      <div class="span-2"><span class="field-note">Ubicación</span><p>${esc(f.direccionPredio)}</p></div>
      <div><span class="field-note">Área de terreno</span><p>${esc(f.area)} m²</p></div>
      <div><span class="field-note">Área de construcción</span><p>186,00 m²</p></div>
      <div><span class="field-note">Avalúo de terreno</span><p>USD 48.200,00</p></div>
      <div><span class="field-note">Avalúo de construcción</span><p>USD 86.400,00</p></div>
      <div><span class="field-note">Avalúo total</span><p><b>USD 134.600,00</b></p></div>
      <div><span class="field-note">Impuesto predial 2026</span><p>Pagado · al día</p></div>
      <div class="span-2"><span class="field-note">Linderos (según certificado del Registro de la Propiedad)</span><p>Norte: Calle Mercadillo · Sur: predio 0406 · Este: 10 de Agosto · Oeste: predio 0404</p></div>
      <div class="span-2"><span class="field-note">Motivo declarado</span><p>${esc(f.motivo)}</p></div>
    </div>
    <p class="muted mono" style="font-size:12px;margin-top:16px">Emitido: 09/09/2026 · Expediente ${flow().expediente} · Firma electrónica simulada · Vigencia referencial 90 días</p>
  </div>`;
}

function chatbot(opts){
  const title=opts&&opts.title||'Revisor Documental Inteligente';
  const status=opts&&opts.status||'En línea · demo';
  const msgs=(opts&&opts.messages||state.chat).map(m=>msgHtml(m)).join('');
  const send=opts&&opts.send||'sendChat()';
  const ph=opts&&opts.placeholder||'Escriba al revisor…';
  return `<div class="card chatbot">
    <div class="chatbot-head">
      <div>
        <strong>${esc(title)}</strong>
        ${opts&&opts.sub?`<span class="lbl">${esc(opts.sub)}</span>`:''}
      </div>
      <span class="status info">${esc(status)}</span>
    </div>
    <div class="chatbot-msgs" id="chatMsgs">${msgs}</div>
    <div class="chatbot-form">
      <input id="chatIn" class="input" placeholder="${esc(ph)}" onkeydown="if(event.key==='Enter'){event.preventDefault();${send}}">
      <button class="btn primary" onclick="${send}">Enviar</button>
    </div>
  </div>`;
}

function msgHtml(m){
  return `<div class="msg ${m.role}"><p>${esc(m.text)}</p></div>`;
}

function withChat(main,chatOpts){
  return `<div class="tramite-layout ${chatOpts&&chatOpts.wide?'wide':''}"><div class="tramite-main">${main}</div>${chatbot(chatOpts)}</div>`;
}

function soundBars(){
  return `<span class="sound-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`;
}

function zoomJoiningView(){
  const fl=flow();
  return `<div class="zoom">
    <div class="zoom-bar">
      <span>Municipio de Loja · ${esc(ASESOR.sala)}</span>
      <span class="mono">${fl.ticket}</span>
    </div>
    <div class="zoom-join">
      <div class="zoom-tile speaking">
        ${personaPatricia}
        <div class="zoom-tag"><b>${esc(ASESOR.nombre)}</b> ya está en la sala${soundBars()}</div>
      </div>
      <p class="zoom-join-msg">Uniéndose a la videollamada…</p>
      <p class="muted">La asesora de Rentas ya se encuentra en la reunión y tiene su expediente.</p>
    </div>
  </div>`;
}

function zoomRoomView(){
  const fl=flow();
  const habla=state.asesorHabla;
  const msgs=(state.helpChat||[]).map(m=>msgHtml(m)).join('');
  return `<div class="zoom">
    <div class="zoom-bar">
      <span>Municipio de Loja · ${esc(ASESOR.sala)}</span>
      <span>2 participantes · <span class="mono">${fl.ticket}</span></span>
    </div>
    <div class="zoom-body">
      <div class="zoom-stage">
        <div class="zoom-tile main ${habla?'speaking':''}">
          ${personaPatricia}
          <div class="zoom-tag">
            <span class="zoom-live">En vivo</span>
            <b>${esc(ASESOR.nombre)}</b>
            <span>${esc(ASESOR.cargo)}</span>
            ${habla?soundBars():''}
          </div>
        </div>
        <div class="zoom-tile self ${state.zoomCam?'':'cam-off'}">
          ${state.zoomCam?personaCiudadana:'<div class="zoom-initials">MFT</div>'}
          <div class="zoom-tag"><b>María Fernanda Torres</b> <span>(tú)${state.zoomMic?'':' · silenciada'}</span></div>
        </div>
      </div>
      <aside class="zoom-side">
        <div class="zoom-exp">
          <span class="lbl">Expediente en pantalla</span>
          <p class="mono">${fl.expediente}</p>
          <p>Predio solicitud <b>${esc(predioDeclarado())}</b> · comprobante <b>${esc(predioComprobante())}</b></p>
        </div>
        <div class="zoom-chat">
          <strong>Chat de la reunión</strong>
          <div class="chatbot-msgs" id="chatMsgs">${msgs}</div>
          <div class="chatbot-form">
            <input id="chatIn" class="input" placeholder="Hablar con Patricia…" onkeydown="if(event.key==='Enter'){event.preventDefault();sendAsesorChat()}">
            <button class="btn primary" onclick="sendAsesorChat()">Enviar</button>
          </div>
        </div>
      </aside>
    </div>
    <div class="zoom-dock">
      <button class="zoom-ctrl ${state.zoomMic?'on':''}" onclick="toggleZoom('mic')">${state.zoomMic?'Micrófono':'Silenciado'}</button>
      <button class="zoom-ctrl ${state.zoomCam?'on':''}" onclick="toggleZoom('cam')">${state.zoomCam?'Cámara':'Cámara off'}</button>
      <button class="zoom-ctrl" disabled>Compartir</button>
      <button class="zoom-ctrl leave" onclick="colgarZoom()">Colgar</button>
    </div>
  </div>`;
}

function toggleZoom(kind){
  if(kind==='mic')state.zoomMic=!state.zoomMic;
  if(kind==='cam')state.zoomCam=!state.zoomCam;
  content();
}

function colgarZoom(){
  finish();
}

function stepContent(){
  const fl=flow();
  if(state.step===1)return withChat(formSolicitud());
  if(state.step===2)return withChat(docsView());
  if(state.step===3)return withChat(reviewView());
  if(fl.scenario==='inconsistencia'){
    if(state.salaPhase==='uniendo')return zoomJoiningView();
    return zoomRoomView();
  }
  if(state.step===4)return withChat(pagoView());
  return withChat(expedienteView());
}

function formOk(){
  const f=state.form;
  const fl=flow();
  if(fl&&fl.id==='exoneracion') return f.parroquia&&f.barrio&&f.claveCatastral&&f.numeroPredial&&f.direccionPredio&&f.tipoPredio&&f.motivo;
  return f.parroquia&&f.barrio&&f.claveCatastral&&f.numeroPredial&&f.direccionPredio&&f.area&&f.tipoPredio&&f.uso&&f.motivo;
}

function nextStep(){
  if(state.step<5){state.step+=1;content();}
}

function uploadDoc(id,input){
  const file=input.files&&input.files[0];
  if(!file)return;
  const size=file.size<1024?file.size+' B':(file.size/1024).toFixed(1)+' KB';
  state.uploads[id]={name:file.name,size:size};
  input.value='';
  content();
  botReview(id,file.name);
}

function appendMsg(msg,store){
  (store||state.chat).push(msg);
  const box=document.getElementById('chatMsgs');
  if(!box)return;
  box.insertAdjacentHTML('beforeend',msgHtml(msg));
  box.scrollTop=box.scrollHeight;
}

function botSay(text,delay){
  const box=document.getElementById('chatMsgs');
  if(box&&!document.getElementById('typing')){
    box.insertAdjacentHTML('beforeend','<div class="msg bot typing" id="typing"><p>Revisando documentación…</p></div>');
    box.scrollTop=box.scrollHeight;
  }
  setTimeout(()=>{
    const t=document.getElementById('typing');
    if(t)t.remove();
    appendMsg({role:'bot',text});
  },delay||900);
}

function botReview(id,filename){
  const f=state.form;
  const n=requiredDocs().length;
  let text='Recibí «'+filename+'». ';
  if(id==='cedula') text+='La identificación coincide con '+titular()+', cédula '+f.cedula+'. Documento legible.';
  else if(id==='escrituras') text+='Escritura inscrita en el Registro de la Propiedad. La titularidad debería constar a nombre de la solicitante.';
  else if(id==='registro') text+='Certificado historiado y linderado del Registro de la Propiedad. Verificaré vigencia y que no existan gravámenes que impidan certificar.';
  else if(id==='predial') text+='Comprobante de impuesto predial vigente. Lo cruzaré con el número predial declarado en la solicitud.';
  else text+='Formato aceptado. Lo contrastaré con los requisitos oficiales.';
  if(!formOk()) text+=' Aún faltan datos del predio en la solicitud; complételos para el cruce final.';
  if(docsOk()&&formOk()) text+=' Ya están los '+n+' requisitos. En el paso 3 puedo ejecutar la revisión completa.';
  botSay(text,1100);
}

function sendChat(){
  const input=document.getElementById('chatIn');
  if(!input)return;
  const text=input.value.trim();
  if(!text)return;
  input.value='';
  appendMsg({role:'user',text});
  botSay(replyTo(text),700);
}

function sendAsesorChat(){
  const input=document.getElementById('chatIn');
  if(!input)return;
  const text=input.value.trim();
  if(!text)return;
  input.value='';
  state.helpChat.push({role:'user',text});
  state.asesorHabla=true;
  content();
  setTimeout(()=>{
    state.helpChat.push({role:'bot',text:asesorReply(text)});
    content();
    setTimeout(()=>{state.asesorHabla=false;content();},3200);
  },900);
}

function asesorReply(text){
  const t=text.toLowerCase();
  if(/hola|buenos|buenas/.test(t)) return 'Buenos días. Ya tengo su expediente en pantalla. La observación es concreta: solicitud '+predioDeclarado()+' versus comprobante '+predioComprobante()+'.';
  if(/solicitud|formulario|declar|0405|correcto el predio|el mío|el mio/.test(t)) return 'Si el número correcto es el de la solicitud ('+predioDeclarado()+'), el comprobante pertenece a otro predio. Necesitamos el impuesto predial vigente de ese número. Cuando lo tenga, se reanuda la revisión.';
  if(/comprobante|recibo|predial|0418|adjunté mal|adjunte mal|equivoc/.test(t)) return 'Entendido: es un error de documento. El comprobante leído corresponde al predio '+predioComprobante()+'. Reemplace ese archivo por el predial de '+predioDeclarado()+' y el Revisor Documental Inteligente podrá volver a cruzar.';
  if(/expediente|contexto|ve|tiene/.test(t)) return 'Sí. Al transferirla me llegó el ticket '+flow().ticket+', la solicitud, los tres anexos, el cruce de la IA y la línea de tiempo. No tiene que repetir su historia.';
  if(/gracias|listo|ok/.test(t)) return 'Con gusto. Quedo en la sala si necesita que le indique cómo corregir el número o cómo volver a cargar el comprobante. Esta atención es una simulación.';
  return 'La diferencia está entre el número predial de la solicitud ('+predioDeclarado()+') y el extraído del comprobante ('+predioComprobante()+'). Dígame cuál es el predio que desea exonerar y le indico el siguiente paso.';
}

function replyTo(text){
  const t=text.toLowerCase();
  const fl=flow()||FLOWS.avaluo;
  const docs=requiredDocs();
  if(/hola|buenos|buenas|días|tardes/.test(t)) return 'Buenos días, María Fernanda. Estoy asignada a su '+fl.nombre+'. ¿Quiere orientación sobre requisitos, documentos o el estado de la revisión?';
  if(/ayuda|orientaci|asesor|humano|zoom|video/.test(t)) return state.observed?'Pulse Necesito ayuda. La conectaré ahora mismo a una videollamada con la Lcda. Patricia Cueva, que ya está en la sala.':'Si la revisión termina con una observación, aparecerá Necesito ayuda para entrar a una videollamada con un asesor.';
  if(/requisito/.test(t)) return fl.id==='exoneracion'
    ?'Requisitos oficiales simulados: 1) solicitud a la Dirección Financiera con cédula, teléfono y correo; 2) cédula; 3) escrituras inscritas; 4) comprobante de impuesto predial vigente. Todo es demostrativo.'
    :'Requisitos oficiales simulados: 1) solicitud al Jefe de Avalúos y Catastros con cédula, teléfono y correo; 2) cédula; 3) escrituras inscritas; 4) certificado del Registro de la Propiedad; 5) comprobante de impuesto predial vigente; 6) derecho de certificación.';
  if(/inconsisten|observ/.test(t)){
    if(fl.scenario==='inconsistencia') return state.observed?'Hay una diferencia entre el número predial de la solicitud ('+predioDeclarado()+') y el del comprobante ('+predioComprobante()+'). Use Necesito ayuda.':'Cuando complete solicitud y documentos ejecutaré el cruce. En este escenario de demostración habrá una observación.';
    return state.reviewed?'No detecté inconsistencias. Formulario y documentos coinciden. El pago está habilitado.':'Cuando complete solicitud y documentos ejecutaré el cruce. En este escenario no habrá observaciones.';
  }
  if(/documento|archivo|subí|subi|adjunt/.test(t)) return 'Llevamos '+docsCount()+' de '+docs.length+' documentos oficiales. '+(docsOk()?'La carga está completa.':'Faltan: '+docs.filter(d=>!state.uploads[d.id]).map(d=>d.label).join(', ')+'.');
  if(/pago|valor|cuesta|costo|derecho/.test(t)) return fl.costo==='Sin costo'?'Este trámite no tiene costo. La observación se resuelve en la sala de orientación.':'El derecho de certificación ficticio es '+fl.costo+'. Se habilita solo si la IA confirma que no hay inconsistencias.';
  if(/maria|maría|cedula|cédula|datos/.test(t)) return 'Perfil precargado: María Fernanda Torres Castillo, cédula 1104567890. Los datos del predio sí debe completarlos usted.';
  if(/expediente|certificado/.test(t)) return fl.scenario==='inconsistencia'?'El expediente viaja con usted a la sala de orientación. El asesor lo ve completo al transferirse.':'El certificado se emite al presentar el expediente, después del pago.';
  return 'Tomé nota. Indique si necesita requisitos, estado de archivos o el resultado de la revisión.';
}

function finish(){
  state.tramite=null;
  content();
}

function pagos(){
  const a=FLOWS.avaluo;
  return `${hero('Obligaciones','Mis pagos','Consulta tus obligaciones y pagos.')}<div class="card flush"><div class="table-wrap"><table class="table"><thead><tr><th>Concepto</th><th>Referencia</th><th>Valor</th><th>Estado</th></tr></thead><tbody><tr><td>Derecho de certificación — ${esc(a.nombre)}</td><td class="code">${a.expediente}</td><td>${a.costo}</td><td>${state.tramite==='avaluo'&&state.paid?'<span class="status">Pagado</span>':'<span class="status warn">'+(state.tramite==='avaluo'&&state.reviewed&&!state.observed?'Habilitado':'Pendiente de revisión')+'</span>'}</td></tr><tr><td>Exoneración de impuesto predial</td><td class="code">${FLOWS.exoneracion.expediente}</td><td>Sin costo</td><td><span class="status">No aplica</span></td></tr></tbody></table></div><p class="scroll-hint">Desliza la tabla para ver más columnas →</p></div>`;
}

function notifications(){
  const n1=state.observed
    ?`<div class="list-item"><div><b>Inconsistencia en ${esc(FLOWS.exoneracion.nombre)}</b><br><span class="muted">El número predial de la solicitud no coincide con el comprobante. Puede pedir ayuda humana.</span></div><span class="status warn">Observado</span></div>`
    :state.reviewed
      ?`<div class="list-item"><div><b>Revisión sin observaciones</b><br><span class="muted">La IA no encontró inconsistencias. El pago del derecho de certificación está habilitado.</span></div><span class="status">Nueva</span></div>`
      :`<div class="list-item"><div><b>Trámites demostrativos disponibles</b><br><span class="muted">Escenario 1: certificado de avalúos. Escenario 2: exoneración predial con asistencia.</span></div><span class="status">Nueva</span></div>`;
  const n2=state.salaPhase==='asesor'
    ?`<div class="list-item"><div><b>Videollamada con ${ASESOR.nombre}</b><br><span class="muted">Está en la sala de orientación y ya tiene el expediente ${FLOWS.exoneracion.expediente}.</span></div><span class="status">Nueva</span></div>`
    :state.paid
      ?`<div class="list-item"><div><b>Pago registrado</b><br><span class="muted">Comprobante REC-2026-09114. Ya puede presentar el expediente.</span></div><span class="status">Nueva</span></div>`
      :`<div class="list-item"><div><b>Derecho de certificación</b><br><span class="muted">El valor ficticio es ${FLOWS.avaluo.costo}. Se habilita tras la revisión del escenario 1.</span></div><span class="status">Nueva</span></div>`;
  return `${hero('Bandeja','Notificaciones','Comunicaciones oficiales simuladas.')}<div class="list">${n1}${n2}<div class="list-item"><div><b>Consulta ciudadana</b><br><span class="muted">Participa en el plan de movilidad sostenible.</span></div><span class="status">Nueva</span></div></div>`;
}

function participation(){return `${hero('Ciudad abierta','Participación','Participa en decisiones y consultas de la ciudad.')}<div class="grid two"><div class="card"><h3><span class="sq"></span> Movilidad sostenible</h3><p class="muted">Prioridades para mejorar ciclovías y transporte.</p><button class="btn primary" style="margin-top:16px" onclick="alert('Voto registrado en la simulación')">Participar</button></div><div class="card"><h3><span class="sq" style="background:var(--gold)"></span> Espacios públicos</h3><p class="muted">Selecciona proyectos prioritarios para tu barrio.</p><button class="btn primary" style="margin-top:16px" onclick="alert('Propuesta registrada en la simulación')">Proponer</button></div></div>`}

function logout(){
  reviewSeq+=1;
  salaSeq+=1;
  state.logged=false;
  state.tramite=null;
  state.section='inicio';
  state.form=defaultForm();
  state.uploads=emptyDocs();
  state.chat=welcomeChat();
  state.helpChat=[];
  state.paid=false;
  state.reviewed=false;
  state.reviewing=false;
  state.observed=false;
  state.helpRequested=false;
  state.salaPhase=null;
  state.asesorHabla=false;
  state.zoomMic=true;
  state.zoomCam=true;
  state.reviewItems=[];
  state.reviewTotal=0;
  state.timeline=[];
  state.step=1;
  state.catalogQuery='';
  state.catalogCat='Todas';
  state.catalogMsg=null;
  resetListed('avaluo');
  resetListed('exoneracion');
  render();
}

render();
