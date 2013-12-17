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

Ext.define('My.store.Kota', {
	extend: 'Ext.data.Store',
	autoLoad: true,
	fields: [
	    {name: 'id', type: 'int'},
	    {name: 'text', type: 'string'},
	    {name: 'alamat', type: 'string'}
	],
	data:[
	    {id: 1, text: 'Jakarta', alamat: 'Jakarta, Indonesia'},
	    {id: 2, text: 'Bandung', alamat: 'Bandung, Indonesia'},
	    {id: 3, text: 'Bogor', alamat: 'Bogor, Indonesia'},
		{id: 4, text: 'Surabaya', alamat: 'Surabaya, Indonesia'},
	]
});

Ext.onReady(function(){
	var directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
	var map;
	
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
				zoom: 8,
				center: new google.maps.LatLng(-6.175414, 106.827146),
			    mapTypeId: google.maps.MapTypeId.ROADMAP,
			}
        },
		dockedItems: [{
			xtype: 'toolbar',
		    dock: 'top',
		    items: [{
		    	itemId: 'start',
		        xtype: 'combo',
		        fieldLabel: 'Start',
		        labelWidth: 50,
		        width: 250,
		        editable: false,
		        store: Ext.create('My.store.Kota'),
		        displayField: 'text', 
		        valueField: 'alamat'
		    },{
		    	itemId: 'end',
		        xtype: 'combo',
		        fieldLabel: 'End',
		        labelWidth: 65,
		        width: 200,
		        editable: false,
		        store: Ext.create('My.store.Kota'),
		        displayField: 'text', 
		        valueField: 'alamat'
		    },{
		        xtype: 'button',
		        text: 'Display',
		        handler: function() {
					this.up('window').displayRoute();
				}
		    }]
		}],
        listeners: {
		    boxready: function() {
				map = this.down('gmappanel');
			    directionsDisplay.setMap(map.gmap);
			}
		},
		displayRoute: function() {
			var start = this.down('combo[itemId="start"]').getValue();
			var end = this.down('combo[itemId="end"]').getValue();
			var request = {
				origin:start,
			    destination:end,
			    travelMode: google.maps.TravelMode.DRIVING
			};
			directionsService.route(request, function(response, status) {
			    if (status == google.maps.DirectionsStatus.OK) {
			      directionsDisplay.setDirections(response);
			    }
			});
		}
    });
 });