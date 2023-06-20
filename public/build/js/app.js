let paso=1;const pasoInicial=1,pasoFinal=3;let resumen=!1;const cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaAnterior(),paginaSiguiente(),consultarAPI(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t="#paso-"+paso;document.querySelector(t).classList.add("mostrar");const o=document.querySelector(".actual");o&&o.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),3==document.querySelector(".actual").dataset.paso&&(resumen=!0),3!=paso&&(resumen=!1),mostrarSeccion(),botonesPaginador()}))})}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");if(1===paso){e.classList.add("ocultar"),t.classList.remove("ocultar");const o=document.querySelector("#submit");o&&o.remove()}else if(3===paso)e.classList.remove("ocultar"),t.classList.add("ocultar"),resumen||mostrarResumen();else{e.classList.remove("ocultar"),t.classList.remove("ocultar");const o=document.querySelector("#submit");o&&o.remove()}}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",()=>{resumen=!1,1!==paso&&(paso--,mostrarSeccion(),botonesPaginador())})}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",()=>{3!==paso&&(paso++,mostrarSeccion(),botonesPaginador())})}async function consultarAPI(){try{const e="/api/servicios",t=await fetch(e,{method:"GET"});mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){const t=document.createDocumentFragment();e.forEach((e,o,r)=>{const{id:a,nombre:n,precio:c}=e,i=document.createElement("P");i.classList.add("nombre-servicio"),i.textContent=n;const s=document.createElement("P");s.classList.add("precio-servicio"),s.textContent="$"+c;const l=document.createElement("DIV");l.classList.add("servicio"),l.dataset.idServicio=a,l.onclick=function(){seleccionarServicio(e)},l.appendChild(i),l.appendChild(s),t.appendChild(l)}),document.querySelector("#servicios").appendChild(t)}function seleccionarServicio(e){const{id:t}=e;let{servicios:o}=cita;const r=document.querySelector([`[data-id-servicio="${t}"]`]);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e.id!==t),r.classList.remove("seleccionado")):(cita.servicios=[...o,e],r.classList.add("seleccionado"))}function idCliente(){cita.id=document.querySelector("#id").value}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();if([0,6].includes(t))mostrarAlerta(document.querySelector("#paso-2 p"),"afterEnd","Turnos disponibles de Lunes a Viernes.","fecha",["alerta","error"]),cita.fecha="";else{const t=document.querySelector('[data-tipo="fecha"]');t&&removerAlerta(t),cita.fecha=e.target.value}}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value,o=t.split(":")[0],r=t.split(":")[1];if(o<9||o>17||17==o&&r>30)mostrarAlerta(document.querySelector(".formulario"),"beforeBegin","Turnos disponibles de 9 AM a 17:30 PM.","hora",["alerta","error"]),cita.hora="";else{const e=document.querySelector('[data-tipo="hora"]');e&&removerAlerta(e),cita.hora=t}}))}function mostrarAlerta(e,t,o,r,a){if(document.querySelector(`[data-tipo="${r}"]`))return;const n=document.createElement("DIV");n.textContent=o,n.dataset.tipo=r,a.forEach(e=>{n.classList.add(e)}),e.insertAdjacentElement(t,n)}function removerAlerta(e){e.remove()}function mostrarResumen(){console.clear();const e=document.querySelector(".contenido-resumen");if(e.innerHTML="",0===cita.servicios.length)mostrarAlerta(document.querySelector("#paso-3"),"beforeEnd","Debes seleccionar al menos un servicio.","servicios",["alerta","error"]),""===cita.fecha&&""===cita.hora?mostrarAlerta(document.querySelector("#paso-3"),"afterBegin","Debes corregir la fecha y el horario del turno.","datos",["alerta","error"]):""===cita.fecha?mostrarAlerta(document.querySelector("#paso-3"),"afterBegin","Debes corregir la fecha del turno.","datos",["alerta","error"]):""==cita.hora&&mostrarAlerta(document.querySelector("#paso-3"),"afterBegin","Debes corregir el horario del turno.","datos",["alerta","error"]);else if(""===cita.fecha&&""===cita.hora)mostrarAlerta(document.querySelector("#paso-3"),"afterBegin","Debes corregir la fecha y el horario del turno.","datos",["alerta","error"]);else if(""===cita.fecha)mostrarAlerta(document.querySelector("#paso-3"),"afterBegin","Debes corregir la fecha del turno.","datos",["alerta","error"]);else if(""==cita.hora)mostrarAlerta(document.querySelector("#paso-3"),"afterBegin","Debes corregir el horario del turno.","datos",["alerta","error"]);else{const{nombre:t,fecha:o,hora:r,servicios:a}=cita,n=document.createElement("H3");n.textContent="Resumen de servicios",e.appendChild(n),a.forEach(t=>{const{id:o,nombre:r,precio:a}=t,n=document.createElement("DIV");n.classList.add("contenedor-servicio");const c=document.createElement("P");c.textContent=r;const i=document.createElement("P");i.innerHTML="<span>Precio:</span> $"+a,n.appendChild(c),n.appendChild(i),e.appendChild(n)});const c=document.createElement("H3");c.textContent="Resumen de cita",e.appendChild(c);const i=document.createElement("P");i.innerHTML="<span>Nombre:</span> "+t;const s=document.createElement("P");s.innerHTML="<span>Fecha:</span> "+formatearFecha(o,"es-AR");const l=document.createElement("P");l.innerHTML=`<span>Hora:</span> ${r} hs.`,e.appendChild(i),e.appendChild(s),e.appendChild(l);const d=document.createElement("BUTTON");d.classList.add("boton"),d.id="submit",d.textContent="Reservar turno",d.onclick=function(){reservarCita()},document.querySelector(".paginacion").insertAdjacentElement("beforeend",d)}}function formatearFecha(e,t){const o=new Date(e),r=o.getDate()+2,a=o.getMonth(),n=o.getFullYear();let c=new Date(Date.UTC(n,a,r)).toLocaleDateString(t,{weekday:"long",year:"numeric",month:"long",day:"numeric"});const[i,...s]=c;return c=`${i.toUpperCase()}${s.join("")}`,c}async function reservarCita(){const{id:e,fecha:t,hora:o,servicios:r}=cita,a=r.map(e=>e.id),n=new FormData;n.append("fecha",t),n.append("hora",o),n.append("usuarioId",e),n.append("servicios",a);try{const e="/api/citas",r=await fetch(e,{method:"POST",body:n});(await r.json()).resultado&&Swal.fire({icon:"success",title:"Reserva confirmada",text:`Te esperamos el ${formatearFecha(t,"es-AR")} a las ${o} hs.`,button:"OK"}).then(()=>{window.location.reload()})}catch(e){Swal.fire({icon:"error",title:"Error",text:"Lo sentimos, ha ocurrio un error inesperado. Por favor, vuelve a ingresar la información",button:"OK"}).then(()=>{window.location.reload()})}}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));