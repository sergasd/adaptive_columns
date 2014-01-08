/**
 * jquery плагин для создания адаптивных колонок
 *
 * @author sergasd <sergasd@gmail.com>
 */


jQuery(function(){

    /**
     * @param {jQuery} container
     * @param {Object} options
     * {
     *     targetSelector: селектор блока, в который добавятся колонки,
     *     itemSelector: селектор элемента,
     *     columnWidth: ширина колонки,
     *     columnClass: ксс класс колонок
     * }
     * @constructor
     * */
    var AdaptiveColumns = function(container, options) {
        this.options = $.extend({
            'targetSelector': '.s-adaptive-target',
            'itemSelector': '.s-adaptive-item',
            'columnWidth': 310,
            'columnClass': 's-adaptive-column'
        }, options);
        this.container = container;
        this.items = [];
        this.target = null;
        this.columnsCount = 0;
        this.columns = [];
        this.columnsHeight = [];
        this.init();
    };


    AdaptiveColumns.prototype = {
        init: function(){
            var self = this;

            this.target = $(this.options.targetSelector);
            this.container.find(this.options.itemSelector).each(function(k, item){
                self.items.push($(item));
            });
            this.columnsCount = this.calculateColumnsCount();
            this.bindEvents();
            this._prepareItems(this.items);
            this.update();

            this.container.data('adaptiveColumns', this);
        },

        /**
         * Навешивание событий
         * */
        bindEvents: function(){
            $(window).off('resize.adaptive_columns').on('resize.adaptive_columns', $.proxy(this.onResize, this));
            this.container.off('columns_count_change.adaptive_columns').on('columns_count_change.adaptive_columns', $.proxy(this.onColumnsCountChange, this));
        },

        /**
         * Обработчик изменения размеров окна
         * */
        onResize: function(){
            var newColumnsCount = this.calculateColumnsCount();
            if (newColumnsCount != this.columnsCount) {
                this.container.trigger('columns_count_change.adaptive_columns');
            }
        },

        /**
         * Обработчик изменения числа колонок
         * */
        onColumnsCountChange: function(){
            this.update();
        },

        /**
         * Кэширует высоту элементов
         *
         * @param {Array} items
         * */
        _prepareItems: function(items){
            $.each(items, function(k, item){
                $(item).attr('data-height', $(item).height());
            });
        },

        /**
         * Добавляет новые элементы в колонки
         *
         * @param {Array} items
         * */
        addItems: function(items){
            var self = this;
            this._prepareItems(items);

            items.each(function(k, item){
                self.items.push($(item));
            });

            this._fillColumns(items);
        },

        /**
         * Обновляет колонки
         * */
        update: function(){
            this._createColumns();
            this._fillColumns(this.items);
            this._addColumnsToTarget();
        },

        /**
         * Создает колонки
         * */
        _createColumns: function(){
            var columnsCount = this.calculateColumnsCount(),
                i;

            this.columns = [];
            this.columnsHeight = [];
            for (i = 0; i < columnsCount; i++) {
                this.columns.push($('<div class="adaptive-column ' + this.options.columnClass + '"></div>'));
                this.columnsHeight.push(0);
            }
            this.columnsCount = columnsCount;
        },

        /**
         * Заполняет колонки элементами
         *
         * @param {Array} items
         * */
        _fillColumns: function(items){
            var self = this;
            items = items || this.items;

            $.each(items, function(k, item){
                self._insertIntoColumn($(item));
            });
        },

        /**
         * Вставляет элемент $item в самую маленькую колонку
         *
         * @param {jQuery} item
         * */
        _insertIntoColumn: function(item){
            var columnIndex =  this.findShortColumnIndex(),
                column = this.columns[columnIndex];

            this.columnsHeight[columnIndex] += parseInt(item.attr('data-height'));
            column.append(item);
        },

        /**
         * Находит индекс самой маленькой колонки
         * */
        findShortColumnIndex: function(){
            var result = 0,
                min = Math.min.apply(this, this.columnsHeight),
                i;

            for (i = 0; i < this.columnsCount; i++) {
                if (this.columnsHeight[i] == min) {
                    result = i;
                    break;
                }
            }

            return result;
        },

        /**
         * Вставляет колонки
         * */
        _addColumnsToTarget: function(){
            var column,
                percent = (100 / this.columnsCount),                
                i;
            this.target.empty();
                                  
            for (i = 0; i < this.columnsCount; i++) {                
                column = this.columns[i];
                column.width(percent + '%');
                this.target.append(column);
            }
        },

        /**
         * Вычисляет кол-во колонок в зависимости от ширины контейнера
         * */
        calculateColumnsCount: function(){
            return Math.floor(this.container.width() / this.options.columnWidth);
        }
    };


    $.fn.adaptiveColumns = function(options){
        return this.each(function(){
            new AdaptiveColumns($(this), options);
        });
    };

});

