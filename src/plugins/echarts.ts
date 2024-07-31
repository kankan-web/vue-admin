import * as echarts from 'echarts/core'
import {labelLayout} from 'echarts/features'
import {BarChart,PictorialBarChart,PieChart} from 'echarts/charts'
import { 
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    GraphicComponent
} from 'echarts/components'
import {CanvasRenderer} from 'echarts/renderers'
echarts.use([
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    GraphicComponent,
    BarChart,
    PictorialBarChart,
    PieChart,
    CanvasRenderer,
    LabelLayout
])
export default echarts