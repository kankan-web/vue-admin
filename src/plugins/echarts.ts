//按需引入echarts
import * as echarts from 'echarts/core'

// 引入图表
import { BarChart, LineChart, type BarSeriesOption, type LineSeriesOption } from 'echarts/charts'

// 引入组件
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	type TitleComponentOption,
	type TooltipComponentOption,
	type GridComponentOption,
	type DatasetComponentOption
} from 'echarts/components'

// 引入特性
import { LabelLayout, UniversalTransition } from 'echarts/features'

// 引入渲染器
import { CanvasRenderer } from 'echarts/renderers'

// 组合 Option 类型
export type ECOption = echarts.ComposeOption<
	| BarSeriesOption
	| LineSeriesOption
	| TitleComponentOption
	| TooltipComponentOption
	| GridComponentOption
	| DatasetComponentOption
>

// 注册必须的组件
const components = [
	BarChart,
	LineChart,
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer
]

echarts.use(components)

// 导出 echarts 实例和类型
export type EChartsType = echarts.EChartsType
export { echarts }
export default echarts
