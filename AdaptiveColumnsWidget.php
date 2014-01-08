<?php
/**
 * Виджет для создания адаптивных колонок
 *
 * @author sergasd <sergasd@gmail.com>
 */
class AdaptiveColumnsWidget extends CWidget
{
    /**
     * @var string css класс контейнера, к которому применяется плагин
    */
    public $containerCssClass = 'items';

    /**
     * @var string css класс контейнера, в который будут вставляться новые элементы
    */
    public $targetCssClass = 's-adaptive-target';

    /**
     * @var string css селектор элемента
    */
    public $itemSelector = '.s-adaptive-item';

    /**
     * @var int ширина колонки с элементами
    */
    public $columnWidth = 300;

    /**
     * @var string css класс колонки с элементами
    */
    public $columnCssClass = 's-adaptive-column';


    public function run()
    {
        $this->registerAssets();
        echo CHtml::tag('div', array('class' => "adaptive-target $this->targetCssClass"), '');
    }


    private function registerAssets()
    {
        $baseAssetsDir = Yii::app()->assetManager->publish(__DIR__ . '/assets', false, -1, YII_DEBUG);
        $options = CJavaScript::encode(array(
            'targetSelector' => ".$this->targetCssClass",
            'itemSelector' => $this->itemSelector,
            'columnWidth' => $this->columnWidth,
            'columnCssClass' => $this->columnCssClass
        ));

        $cs = Yii::app()->clientScript;
        $cs->registerScriptFile("$baseAssetsDir/jquery.adaptivecolumns.js");
        $cs->registerScript("adaptive-columns-{$this->id}", "$('.$this->containerCssClass').adaptiveColumns($options);");
    }
}
