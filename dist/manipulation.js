/*--------------------------------------------------------------
Manipulation module
--------------------------------------------------------------*/

;(function($) {

    $.fn.extend({

        append: function(obj) {

            return this.each(function(i, el) {

                $(obj).each(function(i, objEl) {
                    el.appendChild(objEl);
                });

            });

        },

        prepend: function(obj) {

            return this.each(function(i, el) {

                $(obj).each(function(i, objEl) {
                    el.insertBefore(objEl, el.firstChild);
                });

            });

        },

        appendTo: function(obj) {

            return this.each(function(i, el) {

                $(obj).each(function(i, objEl) {
                    objEl.appendChild(el);
                });

            });

        },

        prependTo: function(obj) {

            return this.each(function(i, el) {

                $(obj).each(function(i, objEl) {
                    objEl.insertBefore(el, objEl.firstChild);
                });

            });

        },

        remove: function() {

            return this.each(function() {

                this.parentNode && this.parentNode.removeChild(this);

            });

        },

        detach: function() {

            return this.remove();

        },

        html: function(content) {

            return content ? this.each(function() {

                if (typeof content === 'string' && $.trim(content).indexOf('<') !== 0) {
                    this.innerHTML = content;
                } else {
                    $(this).empty().append(content);
                }

            }) : this.get(0).innerHTML;

        },

        text: function(content) {

            return content ? this.each(function() {

                this.textContent = content;

            }) : this.get(0).textContent;

        },

        empty: function() {

            return this.each(function() {

                this.innerHTML = '';

            });

        },

        replaceWith: function(obj) {

            return this.each(function() {

                this.parentNode.replaceChild($(obj).get(0), this);

            });

        }

    });

})(window.simpleQuery);
