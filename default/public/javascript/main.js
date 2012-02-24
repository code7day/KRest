tpl = {
    // Hash of preloaded templates for the app
    templates: {},
    url: '',
    load: function(names, callback) {
        var that = this;
        var loadTemplate = function(index) {
            var name = names[index];
            $.get(that.url  + name , function(data) {
                that.templates[name] = data;
                index++;
                if (index < names.length) {
                    loadTemplate(index);
                } else {
                    callback();
                }
            });
        }
        loadTemplate(0);
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
    },
    initialize: function() {
       console.info('Iniciado');
    }
});

var Libreria = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: Libro,
    url: "/rest/api"
});

ListView = Backbone.View.extend({
    el: $('#list'), 
    
    initialize: function() {
		var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add, this);

    },
	
	add:function(wine){
		console.info(wine);
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
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
    },
 
    saveWine: function() {
        this.model.set({
            title: $('#title').val(),
            author: $('#author').val()
        });
        
        if (this.model.isNew()) {
            var self = this;
            console.info('Todo ok');
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
		console.info('Eliminar');
        this.model.destroy({
            success: function() {
               
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

	el: $('#header'),

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
 
    list: function() {
        this.wineList = new Libreria();
        this.wineListView = new ListView({model: this.wineList});
        this.wineList.fetch({
			data:{page:1}
        });
    },
    
    view:function(id){
		console.info('Edit');
		
		this.wine = this.wineList.get(id);
        if (app.wineView) app.wineView.close();
        this.wineView = new DetalleView({model: this.wine});
        this.wineView.render();
     }, 
     
     nuevo: function() {
		console.info('New');
        if (app.wineView) app.wineView.close();
        this.wineView = new DetalleView({model: new Libro()});
        this.wineView.render();
     }
});

tpl.load(['header', 'item', 'form'], function() {
	app = new AppRouter();
	Backbone.history.start();
	var Header = new HeaderView();
});

