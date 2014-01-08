Adaptive columns widget
================

Виджет для вывода элементов в адаптивном стиле


Требования
------------
1. Yii 1.1.9
2. jQuery

Установка
------------
1. Скопировать файлы в директорию application.extensions.adaptive_columns


Использование
------------

#### php
```php
$this->widget('ext.adaptive_columns.AdaptiveColumnsWidget', array(
    'containerCssClass' => 'items-container',
    'columnWidth' => 300,
    'itemSelector' => '.adaptive-item',
));
```

#### html
```html
<div class="items-container">
  <div style="height: 200px;" class="adaptive-item">content 1</div>
  <div style="height: 250px;" class="adaptive-item">content 2</div>
  <div style="height: 280px;" class="adaptive-item">content 3</div>
  <div style="height: 300px;" class="adaptive-item">content 4</div>
  <div style="height: 130px;" class="adaptive-item">content 5</div>   
</div>
```

#### css
```css
.adaptive-column {
  display: inline-block;
  vertical-align: top;
}
```

