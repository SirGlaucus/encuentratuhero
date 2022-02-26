/*fetch('https://www.superheroapi.com/api.php/4905856019427443/20').then((response) => {
   response.json().then((data) => {
       console.log(data)
   })
})*/


$(document).ready(function () {
    $("form").submit(function (event) {

        event.preventDefault();
        let valueInput = $("#heroInput").val(); // Guardamos el valor (.val) de el form al realizar el evento submit en la varialbe valueInput
        
        let regex = RegExp('^[0-9]+$');
        if (!regex.test(valueInput) || valueInput < 1 || valueInput > 732) {
            alert("Por favor ingresar un numero entre 1 y 732")
            return
        }
        
        $.ajax({
            url: "https://www.superheroapi.com/api.php/4905856019427443/" + valueInput,
            success: function (data) {
                let nombre = data.name; // Listo
                let conexiones = data.connections["group-affiliation"]; // En caso de guiones o caracteres raros usar corchetes-Listo
                let imagen = data.image.url;
                let publisher = data.biography.publisher;
                let ocupacion = data.work.occupation;
                let primeraVista = data.biography["first-appearance"];
                let altura = data.appearance.height.join(" - ");
                let peso = data.appearance.weight.join(" - ");
                let alianzas = data.biography.aliases.join(" ");

                $("#heroInfo").html(`
                <h3 class="text-center">SuperHero Encontrado</h3>
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${imagen}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Nombre: ${nombre}</h5>
                                <p class="card-text">Conexiones: ${conexiones}.</p>
                                <div class="container" style="max-width: 95%;">
                                    <p class="card-text"><label class="fst-italic">Publicado por:</label> ${publisher}.</p>                              
                                    <hr>
                                    <p class="card-text"><label class="fst-italic">Ocupacion:</label> ${ocupacion}.</p>
                                    <hr>
                                    <p class="card-text"><label class="fst-italic">Primera aparicion:</label> ${primeraVista}.</p>
                                    <hr>
                                    <p class="card-text"><label class="fst-italic">Altura:</label> ${altura}.</p>
                                    <hr>
                                    <p class="card-text"><label class="fst-italic">Peso:</label> ${peso}.</p>
                                    <hr>
                                    <p class="card-text"><label class="fst-italic">Alianza:</label> ${alianzas}.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `);

                const estadisticas = Object.entries(data.powerstats);
                const estadisticasFiltradas = estadisticas.filter((e) => e[1] !== "null");
                const estadisticasModificadas = estadisticasFiltradas.map(function (datos) {
                    return {
                        label: datos[0],
                        y: parseInt(datos[1])
                    };
                });

                console.log(estadisticasFiltradas);
                console.log(estadisticasModificadas);

                if (estadisticasModificadas.length > 0) {
                    let config = {
                        title: {
                            text: `Estadisticas de poder para ${nombre}`
                        },
                        data: [{
                            type: "pie",
                            //startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}",
                            showInLegend: "true",
                            legendText: "{label}",
                            //indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}",
                            dataPoints: estadisticasModificadas
                        }]
                    };
                    let chart = ""
                    chart = new CanvasJS.Chart("heroStats", config);
                    chart.render();

                    console.log("Funciona!!!")
                } else {
                    $("#heroStats").html(
                        `<h1 class="text-center">No hay datos disponibles de sus estadisticas</h1>`
                    )
                    console.log("Funciono el error?")
                }


            }, // Atento en esta cosa
        })
    })
})
