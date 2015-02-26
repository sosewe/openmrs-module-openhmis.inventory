/*
 * The contents of this file are subject to the OpenMRS Public License
 * Version 2.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */
define(
	[
		openhmis.url.backboneBase + 'js/lib/jquery',
		openhmis.url.backboneBase + 'js/lib/underscore',
		openhmis.url.backboneBase + 'js/lib/backbone',
		openhmis.url.backboneBase + 'js/lib/i18n',
		openhmis.url.backboneBase + 'js/view/search',
		'js!' + openhmis.url.inventoryBase + 'js/itemAutocomplete.js'
	],
	function($, _, Backbone, __, openhmis) {
		openhmis.DepartmentAndNameSearchView = openhmis.BaseSearchView.extend(
		/** @lends DepartmentAndNameSearchView.prototype */
		{
			tmplFile: openhmis.url.inventoryBase + 'template/search.html',
			tmplSelector: '#department-name-search',

			/**
			 * @class DepartmentAndNameSearchView
			 * @extends BaseSearchView
			 * @classdesc A search view that supports searching by department
			 *     and name.
			 * @constructor DepartmentAndNameSearchView
			 * @param {map} options View options.  See options for
			 *     {@link BaseSearchView}.
			 *
			 */
			initialize: function(options) {
				this.events['change #department_uuid'] = 'onFormSubmit';
				openhmis.BaseSearchView.prototype.initialize.call(this, options);
				var departmentCollection = new openhmis.GenericCollection([], { model: openhmis.Department });
				departmentCollection.on("reset", function(collection) {
					collection.unshift(new openhmis.Department({ name: __("Any") }));
				});
				this.form = new Backbone.Form({
					className: "inline",
					schema: {
						department_uuid: {
							title: __("Department"),
							type: "Select",
							options: departmentCollection
						},
						q: {
							title: __("%s Identifier or Name", this.model.meta.name),
							type: "Text",
							editorClass: "search"
						}
					},
					data: {}
				});
			},

			/** Collect user input */
			commitForm: function() {
				var filters = this.form.getValue();
				if (!filters.department_uuid && !filters.q)
					this.searchFilter = undefined;
				else
					this.searchFilter = filters;
			},

			/**
			 * Get fetch options
			 *
			 * @param {map} options Fetch options from base view
			 * @returns {map} Map of fetch options
			 */
			getFetchOptions: function(options) {
				options = options ? options : {}
				if (this.searchFilter) {
					for (var filter in this.searchFilter)
						options.queryString = openhmis.addQueryStringParameter(
							options.queryString, filter + "=" + encodeURIComponent(this.searchFilter[filter]));
				}
				return options;
			},

			/** Focus the search form */
			focus: function() { this.$("#q").focus(); },

			/**
			 * Render the view
			 *
			 * @returns {View} The rendered view
			 */
			render: function() {
				this.$el.html(this.template({ __: __ }));
				this.$("div.box").append(this.form.render().el);
				if (this.searchFilter)
					this.form.setValue(this.searchFilter);
				this.$("form").addClass("inline");
				this.$("form ul").append('<button id="submit">'+__("Search")+'</button>');
				return this;
			}
		});

		openhmis.LocationAndNameSearchView = openhmis.BaseSearchView.extend({
			tmplFile: openhmis.url.inventoryBase + 'template/search.html',
			tmplSelector: '#location-name-search',

			initialize: function(options) {
				this.events['change #location_uuid'] = 'onFormSubmit';
				openhmis.BaseSearchView.prototype.initialize.call(this, options);
				var locationCollection = new openhmis.GenericCollection([], {
                    model: openhmis.Location,
                    limit: openhmis.rest.maxResults
                });
				locationCollection.on("reset", function(collection) {
					collection.unshift(new openhmis.Location({ name: __("Any") }));
				});
				this.form = new Backbone.Form({
					className: "inline",
					schema: {
						location_uuid: {
							title: __("Location"),
							type: "Select",
							options: locationCollection
						},
						q: {
							title: __("%s Name", this.model.meta.name),
							type: "Text",
							editorClass: "search"
						}
					},
					data: {}
				});
			},

			/** Collect user input */
			commitForm: function() {
				var filters = this.form.getValue();
				if (!filters.location_uuid && !filters.q)
					this.searchFilter = undefined;
				else
					this.searchFilter = filters;
			},

			/**
			 * Get fetch options
			 *
			 * @param {map} options Fetch options from base view
			 * @returns {map} Map of fetch options
			 */
			getFetchOptions: function(options) {
				options = options ? options : {}
				if (this.searchFilter) {
					for (var filter in this.searchFilter)
						options.queryString = openhmis.addQueryStringParameter(
							options.queryString, filter + "=" + encodeURIComponent(this.searchFilter[filter]));
				}
				return options;
			},

			/** Focus the search form */
			focus: function() { this.$("#q").focus(); },

			/**
			 * Render the view
			 *
			 * @returns {View} The rendered view
			 */
			render: function() {
				this.$el.html(this.template({ __: __ }));
				this.$("div.box").append(this.form.render().el);
				if (this.searchFilter)
					this.form.setValue(this.searchFilter);
				this.$("form").addClass("inline");
				this.$("form ul").append('<button id="submit">'+__("Search")+'</button>');
				return this;
			}
		});

		openhmis.ByNameSearchView = openhmis.BaseSearchView.extend({
			tmplFile: openhmis.url.inventoryBase + 'template/search.html',
			tmplSelector: '#by-name-search',

			initialize: function(options) {
				openhmis.BaseSearchView.prototype.initialize.call(this, options);
				this.form = new Backbone.Form({
					className: "inline",
					schema: {
						q: {
							title: __("%s Name", this.model.meta.name),
							type: "Text",
							editorClass: "search"
						}
					},
					data: {}
				});
			},

			getFetchOptions: function(options) {
				options = options ? options : {}
				if (this.searchFilter) {
					for (var filter in this.searchFilter)
						options.queryString = openhmis.addQueryStringParameter(
							options.queryString, filter + "=" + encodeURIComponent(this.searchFilter[filter]));
				}
				return options;
			},

			focus: function() { this.$("#q").focus(); },

			commitForm: function() {
				var filters = this.form.getValue();
				this.searchFilter = filters;
			},

			render: function() {
				this.$el.html(this.template({ __: __ }));
				this.$("div.box").append(this.form.render().el);
				if (this.searchFilter)
					this.form.setValue(this.searchFilter);
				this.$("form").addClass("inline");
				this.$("form ul").append('<button id="submit">'+__("Search")+'</button>');
				return this;
			}
		});

        openhmis.OperationSearchByStatus = openhmis.BaseSearchView.extend({
            tmplFile: openhmis.url.inventoryBase + 'template/search.html',
            tmplSelector: '#operation-search',

            STATUSES: ["Any", "Pending", "Completed", "Cancelled", "Rollback"],

            initialize: function(options) {
                this.events['change #operation_status'] = 'onFormSubmit';
                this.events['change #operationType_uuid'] = 'onFormSubmit';
                this.events['change #item-uuid'] = 'onFormSubmit';

                this.item_uuid = "";

                openhmis.BaseSearchView.prototype.initialize.call(this, options);
                var operationTypeCollection = new openhmis.GenericCollection([], { model: openhmis.OperationType });
                operationTypeCollection.on("reset", function(collection) {
                    collection.unshift(new openhmis.OperationType({ name: __("Any") }));
                });
                this.form = new Backbone.Form({
                    className: "inline",
                    schema: {
                        operation_status: {
                            title: __("Status"),
                            type: "Select",
                            options: this.STATUSES
                        },
                        operationType_uuid: {
                            title: __("Operation Type"),
                            type: "Select",
                            options: operationTypeCollection
                        },
                        operation_item: {
                            title: __("Item"),
                            type: "Text",
                            editorClass: "search"
                        }
                    }
                });

                if (options.operation_status) {
                    this.searchFilter = { operation_status: options.operation_status};
                }
            },

            getFetchOptions: function(options) {
                options = options ? options : {};
                if (this.searchFilter) {
                    for (var filter in this.searchFilter) {
                        if (this.searchFilter[filter] != "Any" && this.searchFilter[filter] !="") {
                            if (filter == "operation_item") {
                                options.queryString = openhmis.addQueryStringParameter(options.queryString, "operationItem_uuid" + "=" + $("#item-uuid").val());
                                this.item_uuid = $("#item-uuid").val();
                            } else {
                                options.queryString = openhmis.addQueryStringParameter(options.queryString, filter + "=" +
                                encodeURIComponent(this.searchFilter[filter]));
                            }
                        }
                    }
                }

                return options;
            },

            focus: function() {
                this.$("#q").focus();
                if (this.item_uuid != "") {
                	$('#item-uuid').val(this.item_uuid);
                }
            },

            commitForm: function() {
                var filters = this.form.getValue();

                if (!filters.operation_status) {
                    this.searchFilter = undefined;
                } else {
                    this.searchFilter = filters;
                }
            },

            render: function() {
                this.$el.html(this.template({ __: __ }));
                this.$("div.box").append(this.form.render().el);

                if (this.searchFilter) {
                   this.form.setValue(this.searchFilter);
                }

                this.$("form").addClass("inline");
                this.$("form ul").append('<button id="submit">'+__("Search")+'</button>');
                this.$("#operation_item").autocomplete({
                    minLength: 2,
                    source: doSearch,
                    select: selectItem
                })
                .data("autocomplete")._renderItem = function (ul, item) {
                return $("<li></li>").data("item.autocomplete", item)
                    .append("<a>" + item.label + "</a>").appendTo(ul);
                };
                return this;
            }
        });

		return openhmis;
	}
)
