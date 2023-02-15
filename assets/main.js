const API_quotes = "https://quotes15.p.rapidapi.com/quotes/random/";
const API_bet = "https://unibet.p.rapidapi.com/live-matches-by-sport?sport=football";

//la url viene de copiar el code snipet que da la pagina del rapidApi - segun se seleccione una APi u otra se elije la opcion fetch
const options = { //esto viene de copiar el code snipet que da la pagina del rapidApi - segun se seleccione una APi u otra se elije la opcion fetch
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '64417eafe3msh5c8ba7617cc207ap1ed67ajsn01efeb448fcf',
		'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
	}
};
const options_unibet = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '64417eafe3msh5c8ba7617cc207ap1ed67ajsn01efeb448fcf',
		'X-RapidAPI-Host': 'unibet.p.rapidapi.com'
	}
};
//creamos la funcion asincrona que permita obtener la respuesta json
async function fetchData (urlApi,opciones){
    const response = await fetch(urlApi,opciones) //no supe por que llamo a optiones como argumento, en otros ejemplos solo le pasa el urlApi
	const data = await response.json();
	return data;
}

//creamos una variable para vincular el id del HTML con el elemento video devuelto por la API (Manipulacion del DOM)
const content = null || document.getElementById('content');

//Creamos una funcion anonima que se autoconvoque, talque no le asigne un espacio en memoria a esta funcion,
//pero que se ejecute cuando sea necesario:
(async () => {
	try {
		const frases = await fetchData(API_quotes, options); //llamamos la API de las quotes
		const bet = await fetchData(API_bet, options_unibet); //llamamos la API de unibet 
		//A partir de aca, tenemos que crear un template en HTML que permita iterar sobre cada elemento de la respuesta json, para poder
		//presentar los elementos en el HTML usando template strings
        
        let view = `
			<div class="group relative">
				<div
					<h2 style= "font-style: italic; padding:35px; color:white;" alt="" class="w-full">${frases.content} - ${frases.originator.name}</h2>
				</div>
			</div>
			<div class="group relative">
				<div
					<h2 style= "padding:35px; color:white; max-width:700px;" alt="" class="w-full">Partido Actual: ${bet[1].name} - Tiempo de Juego: - Odds:${Object.values(bet[1].odds)}</h2>
				</div>
			</div>
		`
		;
	content.innerHTML = view; 
 	} catch (error) {
		console.log(error);
	}
})();