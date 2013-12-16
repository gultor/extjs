/**
 * @author Gultor
 * @email gultor@gmail.com
 */

Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../extjs/examples/ux');
Ext.require([
    'Ext.window.*',
    'Ext.ux.GMapPanel'
]);

Ext.onReady(function(){
	var infowindow = new google.maps.InfoWindow({
	    content: ''
	});
	
	var latLng = new google.maps.LatLng(-6.175414, 106.827146);
	
    Ext.create('Ext.window.Window', {
        autoShow: true,
        layout: 'fit',
        title: 'GMap Window',
        closeAction: 'hide',
        width:650,
        height:450,
        border: false,
        items: {
            xtype: 'gmappanel',
			mapOptions: {
				zoom: 15,
				center: latLng,
			    mapTypeId: google.maps.MapTypeId.ROADMAP,
			}
        },
        listeners: {
		    boxready: function() {
			    map_frame = this.down('gmappanel');
				marker = map_frame.addMarker({
				    position: latLng,
                    cursor: 'pointer',
				    flat: true,
				    title: 'Monumen Nasional',
				    listeners: {
				        click: function(e){
					        infowindow.setContent('<div><img src="monas.jpg" style="padding:5px" align="left">'+
					                              '<span><b>Monumen Nasional</b><br/>'+
					                              'Medan Merdeka<br/>'+
							                      'Jakarta Pusat, Indonesia</span></div>');
				            infowindow.open(map_frame.gmap, marker);
				        }
				    }
				});
			}
		}
    });
 });