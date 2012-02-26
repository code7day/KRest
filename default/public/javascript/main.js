tpl = {
    // Hash of preloaded templates for the app
    templates: {},
    url: '',
    load: function(names, callback) {
		for(var i =0; i < names.length;i++){
			var n = '#tpl-'+names[i];
			this.templates[names[i]] = $(n).html();
		}
		callback();
    },
    // Get template by name from hash of preloaded templates
    get: function(name) {
        return this.templates[name];
    }
};


var Libro = Backbone.Model.extend({
	urlRoot: '/rest/api/',
	defaults:{
		id: null,
		title: null,
		author: null
    }
});

var Libreria = Backbone.Collection.extend({
    model: Libro,
    url: "/rest/api"
});

MsgView = Backbone.View.extend({
	el: $('#msgbox'),
	
    initialize: function() {
		console.info('MsgBox');
		this.template = _.template(tpl.get('msg'));
    },
 
    render: function(arg) {
		var defaults = {
			title:'',
			text:'',
			type:'info'
		}
		data = _.defaults(arg, defaults);
		var e = $(this.el);
		e.html(this.template(data));
        e.fadeIn(500).delay(3000).fadeOut();
    }
});
	


ListView = Backbone.View.extend({
    el: $('#list'), 
    
    initialize: function() {
		var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add, this);

    },
	
	add:function(wine){
		 $(this.el).append(new LibroShow({model: wine}).render().el);
	},
	
    render: function(eventName) {
        _.each(this.model.models, function(wine) {
            $(this.el).append(new LibroShow({model: wine}).render().el);
        }, this);
        return this;
    }
 });


var LibroShow =Backbone.View.extend({
    tagName: "li",
 
    
 
    initialize: function() {
		this.template = _.template(tpl.get('item'));
		this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },
 
    render: function(eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
 
    close: function() {
        $(this.el).unbind();
        $(this.el).remove();
    }
});
 


function ser(form) {
    var data = {};
    form = $('input, textarea, select', form);
    form.each(function(index) {
		data[$(this).attr('id')] = $(this).val();
	});
    return data;
}




window.DetalleView = Backbone.View.extend({
 
    el: $('#show'),
 
    
 
    initialize: function() {
		this.template= _.template(tpl.get('form'));
        this.model.bind("change", this.render, this);
    },
 
    render: function(eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
 
    events: {
        "change input": "change",
        "click .save": "saveWine",
        "click .delete": "deleteWine"
    },
 
    change: function(event) {
        var target = event.target;
        app.msgbox.render({text: 'changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value});
    },
 
    saveWine: function() {
        this.model.set({
            title: $('#title').val(),
            author: $('#author').val()
        });
        
        if (this.model.isNew()) {
            var self = this;
            app.wineList.create(this.model, {
                success: function() {
					app.navigate('view/'+self.model.id, false);
                }
            });
        } else {
            this.model.save();
        }
 
        return false;
    },
 
    deleteWine: function() {
        this.model.destroy({
            success: function() {
				app.msgbox({title:'Correcto', text:'Eliminación Correcta', type:'success'})
			}
        });
        return false;
    },
 
    close: function() {
        $(this.el).unbind();
        $(this.el).empty();
    }
});


window.HeaderView = Backbone.View.extend({
    initialize: function() {
		this.template = _.template(tpl.get('header'));
		this.render();
    },

    render: function(eventName) {
		$(this.el).html(this.template());
		return this;
    },

    events: {
		"click .new": "newWine"
    },

	newWine: function(event) {
		app.msgbox('Informacion', 'Permite agregar un nuevo Libro');
		app.navigate("view/new", true);
		return false;
	}
});

var AppRouter = Backbone.Router.extend({
 
    routes: {
        ""          : "list",
        "view/new" : "nuevo",
        "view/:id" : "view"
    },
	
	initialize: function() {
		/*Permite le uso de los MsgBox*/
        this.msgbox =  function(a,b,c){
			var data = {title:a, text:b, type:c}
			new MsgView().render(data);
		}
        $("#header").html(new HeaderView().render().el);

    },
    
	load:function(c){
		if(!this.bList){
			this.bList = new Libreria();
			this.bListView = new ListView({model: this.bList});
			this.bList.fetch({
				success: function() {
					if(c)c();
				}	
			});
		}
	},
 
    list: function() {
		this.load();
    },
    
    view:function(id){
		this.load(function(){
			this.book = app.bList.get(id);
			if (app.bView) app.bView.close();
			this.bView = new DetalleView({model: this.book});
			this.bView.render();
		});
     }, 
     
     nuevo: function() {
        if (app.wineView) app.wineView.close();
        this.wineView = new DetalleView({model: new Libro()});
        this.wineView.render();
     }
});

tpl.load(['header', 'item', 'form', 'msg'], function() {
	app = new AppRouter();
	Backbone.history.start();
});

