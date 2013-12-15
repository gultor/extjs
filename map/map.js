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
			    mapTypeId: google.maps.MapTypeId.ROADMAP, // HYBRID, ROADMAP, SATELLITE, TERRAIN
			},
            center: {
                geoCodeAddr: 'Monumen Nasional, Jakarta Pusat, Jakarta, Indonesia',
                marker: {
					title: 'Monumen Nasional',
					listeners: {
	                    click: function(e){
	                        Ext.Msg.alert('You click me!', this.title);
	                    }
	                }
				}
            },
            markers: [{
                lat: -6.182134, 
                lng: 106.821825,
                title: 'Bank Indonesia',                
            },{
                lat: -6.176652,
                lng: 106.830619,
                title: 'Stasiun Gambir'
            }]
        }
    });
 });