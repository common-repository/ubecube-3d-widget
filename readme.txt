=== Ubecube 3D ===
Contributors: JacopoG
Donate link:
Tags: widget, news, cube, 3D
Requires at least: 3.5.1
Tested up to: 3.7.1
Stable tag: 1.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Ubecube 3D lets you to display 1 to 6 short texts in sequence.  
Useful for communicate News or what you want.

== Description == 

Ubecube 3D is a simple widget that lets you to display short texts in sequence. The transition from one to the other texts happens with a cube that rotates automatically every predefined interval.

You have up to six fields to fill in the WordPress backend and every field coincides with a face of the cube.

Features:

- Frontend control commands.
All commands that a website user needs for control the widget. Next, Previous, Stop buttons and dots scroll for jump directly to a face of the cube.

- Smart mouse activity detection.
If the user put the mouse on the cube, this stops changing face. So the user can reads without unexpected changes.

- Useful Backend panel.
Simple and easy to use. You don't worry about which fields you fill in the administrator's panel: every face of the cube will always filled with the contents you have already filled. You have just one news? You fill just one field (whatever) and the other faces of the cube will be filled automatically.

- No 3D mode.
If the user browser doesn't support CSS 3D Transforms, the widget is still accessible. So don't worry about what might happen, someone has already thought of. Try it with Internet Explorer (10 or previus).

See the screenshots for have a preview and for more info see the F.A.Q.

N.B. You can have just one Ubecube 3D for page, please, don't try to put more than one Ubecube 3D in a sidebar.

Languages: English, Italian.
For translators: there is a .POT file in the languages directory.

If you have suggestions, feel free to email me at gargiulo.jacopo@gmail.com

Special Thanks: Modernizr's Team, D. DeSandro.

== Installation ==

1. Upload the folder of the plugin to the '/wp-content/plugins/'  
directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Put the widget in any sidebar.

== Frequently Asked Questions ==

= Which browsers support Ubecube 3D? =

Successfully tested on last versions of Chrome(27), Firefox(21) and Safari(6).
On Internet Explorer 10 and previous don't work the 3D version of the widget.

= What happens if the client browser doesn't support the 3D version of the widget? =

The widget works in no-3D mode. Not so beautiful, but it work.

= Can I use html tags in the text fields? =

No, but if you are a developer you can easy change this.
Open ubecube_3d.php with your favorite editor. Go to line 252 and edit it:

'print esc_html( $this->news_to_display[0]['text'] );' **=>** 'print $this->news_to_display[0]['text']; '

= How can I change the aspect of the cube? =

Unfortunately, you must do any modify manually on the stylesheet.
So, if you are a developer I give you some reference for modify it faster.

Open style_jU3D.css:

-Text Color: line 23.  
-Face Color: line 213.  
-Face's border Color : line 214.  
-No-3D Face Color: line 323.  
-No-3D Face's border Color : line 324.  

However, the buttons and the dots scroll are images, so you can't modify it by the CSS.

N.B. Please, don't modify the dimensions of the cube if you don't know how works CSS 3D transforms.

= How can I change the time to wait between news's changes? =

Unfortunately, you must do this modify manually in the script.
For developer:

1. Open animations_jU3D.js.  
2. Go to line 289.  
3. Edit this line "Ubecube._loopID = setInterval( Ubecube.nextFace, 1000 * XXX );" where the XXX are equivalent to the seconds.  

== Screenshots ==

1. Ubecube 3D.

2. Mouse over the cube.

3. Rotation.

4. Administrator's panel.

5. No 3D mode (IE 10).

== Changelog ==

= 1.1 =

* Bug fix: Fixed a bug that caused a fatal error on activation of the plugin.
* Minor fix: Now the styles of the cube are less influenced by the themes.

= 1.0 =
* First release.
