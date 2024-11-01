<?php

/*
Plugin Name: Ubecube 3D Widget
Plugin Script: ubecube_3d.php
Description: Widget News animated with 3d Cube.
Version: 1.1
License: GPLv2 or later
Author: JacopoG
*/

class ubecube_3d extends Wp_Widget {
	
	public function __construct() {
		
		parent::Wp_Widget(
							'jU3D',
							'Ubecube 3D Widget',
							array( 'description' => __( 'Widget News animated with 3d Cube.', 'jU3D' ) )
						);
	}
	
	public function widget( $args, $instance ) {
		
		extract( $args );
		
		//Apply filters to title.
		if( isset($instance['title']) ) {
		$title = apply_filters( 'widget_title', $instance['title'] );
		}
		
		echo $before_widget;
			
			// Print widget's title if exists.
			if( isset($title) ) {
				echo $before_title . $title . $after_title;
			}
			
			$News = new News( $instance );
			
			?>
            <!-- START Cube Container -->
            <div id="ubecube_3d">
            
            	<!-- START 3D Cube -->
                <ul class="cube_3d showFront">
                
                    <!-- Front Face -->
                    <li>
                        <h5><?php $News->print_value(); ?></h5>
                        <p><?php $News->print_value(); ?></p>
                    </li>
                    
                    <!-- Back Face -->
                    <li>
                        <h5><?php $News->print_value(); ?></h5>
                        <p><?php $News->print_value(); ?></p>
                    </li>
                    
                    <!-- Right Face -->
                    <li>
                        <h5><?php $News->print_value(); ?></h5>
                        <p><?php $News->print_value(); ?></p>
                    </li>
                    
                    <!-- Left Face -->
                    <li>
                        <h5><?php $News->print_value(); ?></h5>
                        <p><?php $News->print_value(); ?></p>
                    </li>
                    
                    <!-- Top Face -->
                    <li>
                        <h5><?php $News->print_value(); ?></h5>
                        <p><?php $News->print_value(); ?></p>
                    </li>
                    
                    <!-- Bottom Face -->
                    <li>
                        <h5><?php $News->print_value(); ?></h5>
                        <p><?php $News->print_value(); ?></p>
                    </li>
                    
                </ul>
                <!-- END 3D Cube -->
                
			</div>
            <!-- END Cube Container -->
            
            <!-- START Ubecube Navigator -->
            <div class="ubecubeNav">
            	
                <!-- previous Face Button -->
                <img class="previousNews hideButton" src="<?php echo plugins_url( 'img/transparent.png', __FILE__ ) ?>">
                
                <!-- Dots Scroll -->
				<div class="dotsScrollContainer">
                
                    <img class="dotsScroll showFront on" src="<?php echo plugins_url( 'img/transparent.png', __FILE__ ) ?>">
                    <img class="dotsScroll showBack" src="<?php echo plugins_url( 'img/transparent.png', __FILE__ ) ?>">
                    <img class="dotsScroll showRight" src="<?php echo plugins_url( 'img/transparent.png', __FILE__ ) ?>">
                    <img class="dotsScroll showLeft" src="<?php echo plugins_url( 'img/transparent.png', __FILE__ ) ?>">
                    <img class="dotsScroll showTop" src="<?php echo plugins_url( 'img/transparent.png', __FILE__ ) ?>">
                    <img class="dotsScroll showBottom" src="<?php echo plugins_url( 'img/transparent.png', __FILE__ ) ?>">
                    
                </div>
                
                <!-- Next Face Button -->
                <img class="nextNews hideButton" src="<?php echo plugins_url( 'img/transparent.png', __FILE__ ) ?>">
                
                <!-- Pause Button -->
                <img class="pauseLoop hideButton" src="<?php echo plugins_url( 'img/transparent.png', __FILE__ ) ?>">
                
            </div>
            <!-- END Ubecube Navigator -->
            <?php
			
		echo $after_widget;
		
	} //END Widget.
	
	public function form( $instance ) {
		
		$defaults = array(
						'title'		  => NULL,
						'title_news1' => NULL,
						'text_news1'  => NULL,
						'title_news2' => NULL,
						'text_news2'  => NULL,
						'title_news3' => NULL,
						'text_news3'  => NULL,
						'title_news4' => NULL,
						'text_news4'  => NULL,
						'title_news5' => NULL,
						'text_news5'  => NULL,
						'title_news6' => NULL,
						'text_news6'  => NULL
					);
		
		$instance = wp_parse_args( $instance, $defaults );
		
		?>
        
        <!-- START WIDGET TITLE -->
        <p>
        	<label for="<?php echo $this->get_field_id('title'); ?>">
            	<?php esc_html_e( "Widget's Title", 'jU3D' ); ?>:
            </label>
            <input type="text" class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $instance['title']; ?>">
        </p>
        <!-- END WIDGET TITLE -->
        
        <?php
		
		//Wideget's Form
		
		for( $i = 1; $i < 7; $i++ ):
			
			$current_title = 'title_news' . $i;
			$current_text = 'text_news' . $i;
			
			?>
            
            <!-- START NEWS <?php echo $i; ?> -->
            <div>
            
            	<h4><?php echo esc_html__( "News", 'jU3D' ) . "&nbsp;" . $i; ?></h4>
                <label for="<?php echo $this->get_field_id("$current_title"); ?>">
                	<?php esc_html_e( "Title", 'jU3D' ); ?>:
                </label>
                <input type="text" class="widefat" id="<?php echo $this->get_field_id("$current_title"); ?>" name="<?php echo $this->get_field_name("$current_title"); ?>" value="<?php echo $instance["$current_title"]; ?>">
                
                <label for="<?php echo $this->get_field_id("$current_text"); ?>">
                	<?php esc_html_e( "Text", 'jU3D' ); ?>:
                </label>
                <textarea style="max-width: 100%; min-width: 100%; min-height:75px;" class="widefat" id="<?php echo $this->get_field_id("$current_text"); ?>" name="<?php echo $this->get_field_name("$current_text"); ?>"><?php echo $instance["$current_text"]; ?></textarea>
                
            </div>
            <!-- END NEWS <?php echo $i; ?> -->
            
			<?php
			
		endfor; //END Widget's Form.
		
	} //END Form.
	
} //END Widget Class.



/* N.B. Il codice a seguire serve per fare in modo che tutte le facce del cubo
	contengano sempre qualcosa. Anche nel caso in cui non siano stati compilati
	tutti i campi del form nel backend di wp. */
class News {
	
	//Array contenente tutte le news.
	private $all_news;
	
	//Array contenente le news che rimangono da visualizzare.
	private $news_to_display;
	
	//Contatore del numero di volte che il metodo print_value() è stato chiamato.
	private $n_called = 0;
	
	
	public function __construct( $instance ) {
		
		//Ciclo che controlla tutti i valori di $instance inerenti alle news (titolo e testo).
		for( $i = 1; $i <= 6; $i++ ) {
			
			//Se almeno un valore, tra titolo e testo, della news è impostato,
			// nell'array $this->news viene aggiunto un indice contenente i valori della news.
			if( !empty( $instance['title_news'.$i] ) || !empty( $instance['text_news'.$i] ) ) {
				
				$this->all_news[] = array(
										'title' => $instance['title_news'.$i],
										'text' => $instance['text_news'.$i]
									);
				
			}
			
		} //END For.
		
		//Alla fine dei controlli, tutte le news vengono aggiunte nell'array
		// che contiene le news rimanenti da visualizzare (all'inizio sono tutte da visualizzare).
		$this->news_to_display = $this->all_news;
			
	} //END Construct.
	
	
	public function print_value() {
		
		/* Se non sono rimaste più news da visualizzare,
			l'array news_to_display viene riempito nuovamente
			in modo tale da permettere a tutte le faccie del cubo di essere riempite. */
		if( empty( $this->news_to_display ) ) {
			
			$this->news_to_display = $this->all_news;
			
		} //end IF
		
		/* Si usa la stessa funzione sia per stampare sia titolo che testo della news.
			Per sapere quale dei due stampare, si fa un controllo sul contatore.
			Se pari o uguale a zero si deve stampare il titolo.
			Altrimenti (numero dispari) si deve stampare il testo (visto che viene stampato prima il titolo). */
		if( $this->n_called == 0 || ($this->n_called % 2) == 0 ) {
			
			print esc_html( $this->news_to_display[0]['title'] );
			
		} else {
			
			print esc_html( $this->news_to_display[0]['text'] );
			
			if( is_array($this->news_to_display) ) {
				
				/* Dopo che è stato stampato il testo,
					l'indice dell'array relativo alla news può
					essere eliminato. */
				array_shift( $this->news_to_display );
				
			} //end IF.
			
		} //end ELSE.
		
		//Aumento di 1 il contatore.
		$this->n_called++;
		
	} //end print_value().
	
} //end News.



function register_ubecube_3d_widget() {
	
	register_widget( 'ubecube_3d' );
	
}

function enqueue_ubecube_3d_style() {
	
	wp_enqueue_style( 'jU3D_style', plugins_url( 'style_jU3D.css', __FILE__ ) );
	
}

function enqueue_ubecube_3d_scripts() {
	
	wp_enqueue_script( 'jU3D_script', plugins_url( 'animations_jU3D.js', __FILE__ ) );
	wp_enqueue_script( 'jU3D_Modernizr', plugins_url( 'modernizr_jU3D.js', __FILE__ ) );
	
}

function load_ubecube_3d_textdomain() {
	
	load_plugin_textdomain( 'jU3D', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	
}

add_action( 'wp_enqueue_scripts', 'enqueue_ubecube_3d_style' );
add_action( 'wp_enqueue_scripts', 'enqueue_ubecube_3d_scripts' );
add_action( 'widgets_init', 'register_ubecube_3d_widget' );
add_action( 'plugins_loaded', 'load_ubecube_3d_textdomain' );