// Basic Functions.
	Element.prototype.hasClassName = function (a) {
		return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
	};
	
	Element.prototype.addClassName = function (a) {
		if (!this.hasClassName(a)) {
			this.className = [this.className, a].join(" ");
		}
	};
	
	Element.prototype.removeClassName = function (b) {
		if (this.hasClassName(b)) {
			var a = this.className;
			this.className = a.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ");
		}
	};
	
	Element.prototype.toggleClassName = function (a) {
	  this[this.hasClassName(a) ? "removeClassName" : "addClassName"](a);
	};


Ubecube = {
	
	
	//-- PROPRIETÀ --
	
	//Le possibili posizioni del cubo. Corrispondono alle classi CSS.
	position: new Array(
						'showFront',
						'showBack',
						'showRight',
						'showLeft',
						'showTop',
						'showBottom'
						),
	
	//Se 'true' il cubo gira in automatico, se 'false' il cubo rimane fermo.
	_loop: true,
	
	//Contiene l'id di setInterval.
	_loopID: null,
	
	//Se true, il mouse è sopra il cubo o i pulsanti.
	_mouseOver: false,
	
	
	//-- METODI --
	
	init: function() {
		
		//Recupero il nodo html del Cubo.
		Ubecube.htmlNode = document.getElementsByClassName( 'cube_3d' )[0];
		
		//Recupero i dots scroll
		Ubecube.dotsScroll = document.getElementsByClassName( 'dotsScroll' );
		
		//Se il cubo non c'è, fermo lo script.
		if( Ubecube.htmlNode == "" ) {
			return;
		}
		
		// Test per il valore preserve-3d della proprietà CSS transform-style (IE 10 non lo supporta).
		ModernizrjU3D.testStyles(
			'#modernizrjU3D { -webkit-transform-style: preserve-3d; transform-style: preserve-3d; }',
			function(elem, rule) {
				ModernizrjU3D.addTest(
					'transformstyle',
					window.getComputedStyle( elem )['transformStyle'] == 'preserve-3d' || window.getComputedStyle( elem )['webkitTransformStyle'] == 'preserve-3d'
				);
			}
		);
		
		//Verifico se le transizioni, le trasformazioni e il valore 'preseve-3d' sono supportati.
		//Se qualcosa non è supportato, trasformo il cubo in un semplice elenco e fermo lo script.
		if( !(ModernizrjU3D.csstransitions && ModernizrjU3D.csstransforms && ModernizrjU3D.csstransforms3d && ModernizrjU3D.transformstyle) ) {
			
			Ubecube.htmlNode.removeClassName( 'showFront' );
			Ubecube.htmlNode.removeClassName( 'cube_3d' );
			Ubecube.htmlNode.addClassName( 'no_3d_support' );
			return;
			
		}
		
		//Recupero i nodi html dei Bottoni.
		Ubecube.nextButton = document.getElementsByClassName( 'nextNews' )[0];
		Ubecube.previousButton = document.getElementsByClassName( 'previousNews' )[0];
		Ubecube.pauseButton = document.getElementsByClassName( 'pauseLoop' )[0];
		
		//Aggiungo i listener ai bottoni.
		document.getElementsByClassName( 'nextNews' )[0].addEventListener( 'click', Ubecube.clickNext, false);
		document.getElementsByClassName( 'previousNews' )[0].addEventListener( 'click', Ubecube.clickprevious, false);
		document.getElementsByClassName( 'pauseLoop' )[0].addEventListener( 'click', Ubecube.clickPause, false);
		
		//Aggiungo i listener per i pallini di scorrimento.
		document.getElementsByClassName( 'dotsScrollContainer' )[0].addEventListener( 'click', Ubecube.clickDotsScroll, false);
		
		//Aggiungo i listener al contenitore.
		document.getElementById( 'ubecube_3d' ).addEventListener( 'mouseover', Ubecube.mouseOverCube, false);
		document.getElementById( 'ubecube_3d' ).addEventListener( 'mouseout', Ubecube.mouseOutCube, false);
		document.getElementById( 'ubecube_3d' ).addEventListener( 'touchend', Ubecube.mouseOutCube, false); //Per dispositivi touch.
		document.getElementsByClassName( 'ubecubeNav' )[0].addEventListener( 'mouseover', Ubecube.mouseOverCube, false);
		document.getElementsByClassName( 'ubecubeNav' )[0].addEventListener( 'mouseout', Ubecube.mouseOutCube, false);
		document.getElementsByClassName( 'ubecubeNav' )[0].addEventListener( 'touchend', Ubecube.mouseOutCube, false); //Per dispositivi touch.
		
		//Controllo la variabile della sessione in modo tale da conservare la pausa tra una pagina e l'altra.
		if( sessionStorage.loop == 'false' ) {
			
			Ubecube._loop = false;
			
			Ubecube.pauseButton.addClassName( 'pauseOn' );
			
		}
		
		//Avvio il loop.
		Ubecube.loopRestart();
		
	},
	
	//Metodo che restituisce la faccia(classe) attualmente visualizzata.
	currentFace: function() {
		
		//Verifico qual'è la faccia del cubo attualmente in primo piano.
		for( var i = 0 in Ubecube.position ) {
			
			if( Ubecube.htmlNode.hasClassName( Ubecube.position[i] ) ) {
				
				return Ubecube.position[i];
				
			}
		}
		
		//Se il cubo non ha alcuna classe, la prima faccia (Front) è quella attualmente visualizzata.
		return Ubecube.position[0];
		
	},
	
	//Metodo per cambiare faccia.
	changeFace: function ( face ) {
		
		Ubecube.htmlNode.removeClassName( Ubecube.currentFace() );
		Ubecube.htmlNode.addClassName( face );
		
	},
	
	//Event handler.
	clickNext: function() {
		
		//Il riavvio del timer permette di evitare che la faccia cambi troppo presto.
		Ubecube.loopRestart();
		Ubecube.nextFace();
		
	},
	
	//Event handler.
	clickprevious: function() {
		
		//Il riavvio del timer permette di evitare che la faccia cambi troppo presto.
		Ubecube.loopRestart();
		Ubecube.previousFace();
		
	},
	
	//Event handler.
	clickPause: function() {
		
		// Se true, il loop va fermato. Se false il loop va avviato.
		if( Ubecube._loop ) {
			
			Ubecube.loopStop();
			Ubecube.pauseButton.addClassName( 'pauseOn' );
			
		} else {
			
			Ubecube.loopStart();
			Ubecube.pauseButton.removeClassName( 'pauseOn' );
			
		}
		
	},
	
	clickDotsScroll: function( event ) {
		
		if( event.target.hasClassName( 'dotsScroll' ) ) {
			
			Ubecube.resetDotsScroll();
			
			for( var i = 0; i < Ubecube.dotsScroll.length; i++ ) {
				
				if( event.target.hasClassName( Ubecube.position[i] ) ) {
					
					event.target.addClassName( 'on' );
					Ubecube.htmlNode.removeClassName( Ubecube.currentFace() );
					Ubecube.htmlNode.addClassName( Ubecube.position[i] );
					
				}
				
			}
			
		}
		
	},
	

	// Metodo che ripristina tutti i pallini.
	resetDotsScroll: function() {
		
		for( var i = 0; i < Ubecube.dotsScroll.length; i++ ) {
			
			Ubecube.dotsScroll[i].removeClassName( 'on' );
			
		}
		
	},
	
	// Metodo che riceve come argomento la faccia del cubo visualizzata
	// e colora il quadratino corrispondente.
	activeDotsScroll: function( face ) {
		
		Ubecube.resetDotsScroll();
		
		for( var i = 0; i < Ubecube.dotsScroll.length; i++ ) {
			
			if( Ubecube.dotsScroll[i].hasClassName( face ) ) {
				
				Ubecube.dotsScroll[i].addClassName( 'on' );
				return;
				
			}
			
		}
		
	},
	
/*	L'ordine di visualizzazione delle facce equivale all'ordine di successione degli elementi dell'array Ubecube.position[].
	È sufficente ricavare l'indice dell'array dell'attuale posizione e sommare 1 per avere l'indice della successiva posizione.
	Il controllo condizionale presente serve per far ricominciare il ciclo arrivati all'ultimo elemento dell'array. */
	nextFace: function() {
		
		if( Ubecube.position.indexOf( Ubecube.currentFace() ) < Ubecube.position.length - 1 ) {
			
			var nextFace = Ubecube.position[Ubecube.position.indexOf( Ubecube.currentFace() ) + 1];
			
		} else {
			
			//Si ricomincia dalla prima faccia.
			var nextFace = Ubecube.position[0];
			
		}
		
		Ubecube.changeFace( nextFace );
		Ubecube.activeDotsScroll( nextFace );
		
	},
	
	// Stesse spiegazioni di Ubecube.nextFace con le uniche differenze che il controllo è al contrario e che invece di sommare 1 bisogna sottrarre 1 all'indice dell'array.
	previousFace: function() {
		
		if( Ubecube.position.indexOf( Ubecube.currentFace() ) > 0 ) {
			
			var previousFace = Ubecube.position[Ubecube.position.indexOf( Ubecube.currentFace() ) - 1];
			
		} else {
			
			var previousFace = Ubecube.position[Ubecube.position.length - 1];
			
		}
		
		Ubecube.changeFace( previousFace );
		Ubecube.activeDotsScroll( previousFace );
		
	},
	
	//Metodo per avviare il loop.
	loopStart: function() {
		
		//Per sicurezza viene azzerato qualunque loop in corso.
		clearInterval( Ubecube._loopID );
		
		//Vengono impostate a true le variabili che permettono allo script di sapere se il loop è attivo o meno.
		Ubecube._loop = true;
		sessionStorage.loop = true;
		
		//Viene avviato il loop.
		Ubecube._loopID = setInterval( Ubecube.nextFace, 1000 * 10 ); //The number after * is equivalent to the seconds to wait between animations.
		
	},
	
	//Metodo per fermare il loop.
	loopStop: function() {
		
		//Vengono impostate a false le variabili che permettono allo script di sapere se il loop è attivo o meno.
		Ubecube._loop = false;
		sessionStorage.loop = false;
		
		//Viene fermato il loop.
		clearInterval( Ubecube._loopID );
		
		//Per sicurezza, la variabile contenente l'id del loop viene svuotata.
		Ubecube._loopID = null;
		
	},
	
	//Metodo che serve per fermare temporaneamente il loop, visto che non modifica alcuna variabile a differenza di Ubecube.loopStop().
	//In questo modo, quando viene richiamato il metodo Ubecube.loopRestart() (vedi più sotto), il loop riparte.
	loopPause: function() {
		
		//La pausa viene applicata solo se il loop è attivo.
		if( Ubecube._loop ) {
			
			clearInterval( Ubecube._loopID );
		
		}
		
	},
	
	//Metodo che avvia il loop solo se questo è attivo (vedi variabile Ubecube._loop).
	//È il metodo che viene richiamato in fase di inizializzazione e può essere utile per riavviare il timer del loop.
	loopRestart: function() {
		
		//Oltre alla variabile Ubecube._loop viene controllata anche un'altra variabile.
		//In questo modo è possibile evitare che il loop venga avviato quando l'utente ha posizionato il mouse sopra il cubo.
		if( Ubecube._loop && ! Ubecube._mouseOver ) {
			
			Ubecube.loopStart();
			
		}
		
	},
		
	//Event handler.
	mouseOverCube: function() {
		
		//Viene impostata a true la variabile che permette di sapere allo script se il mouse è sopra il cubo o meno.
		Ubecube._mouseOver = true;
		
		//Il loop viene messo in pausa quando l'utente porta il mouse sopra il cubo.
		Ubecube.loopPause();
		
		//Vengono mostrati i bottoni.
		Ubecube.showButton();
		
	},
	
	//Event handler.
	mouseOutCube: function() {
		
		//Viene impostata a false la variabile che permette di sapere allo script se il mouse è sopra il cubo o meno.
		Ubecube._mouseOver = false;
		
		//Il loop viene fatto ripartire quando l'utente sposta il mouse dal cubo.
		Ubecube.loopRestart();
		
		//Vengono nascosti i bottoni.
		Ubecube.hideButton();
		
	},
	
	//Metodo che cambia le classi ai bottoni per renderli visibili.
	showButton: function() {
		
		Ubecube.nextButton.removeClassName( 'hideButton' );
		Ubecube.nextButton.addClassName ( 'showButton' );
		Ubecube.previousButton.removeClassName( 'hideButton' );
		Ubecube.previousButton.addClassName ( 'showButton' );
		Ubecube.pauseButton.removeClassName( 'hideButton' );
		Ubecube.pauseButton.addClassName ( 'showButton' );

	},
	
	//Metodo che cambia le classi ai bottoni per nasconderli.
	hideButton: function() {
		
		Ubecube.nextButton.addClassName( 'hideButton' );
		Ubecube.nextButton.removeClassName ( 'showButton' );
		Ubecube.previousButton.addClassName( 'hideButton' );
		Ubecube.previousButton.removeClassName ( 'showButton' );
		Ubecube.pauseButton.addClassName( 'hideButton' );
		Ubecube.pauseButton.removeClassName ( 'showButton' );

		
	}
}

//Inizializzazione a fine caricamento pagina.
window.addEventListener( 'DOMContentLoaded', Ubecube.init, false );