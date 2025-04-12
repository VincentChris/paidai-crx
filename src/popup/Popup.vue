<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { ElDatePicker, ElTable, ElTableColumn, ElMessage, ElInput } from 'element-plus'
import dayjs from 'dayjs'
import 'element-plus/dist/index.css'

// 日期范围
const dateRange = ref<[Date, Date]>([new Date(), new Date()])

// 表格数据
const tableData = ref<Array<{
  date: string
  newFans: number
  totalFans: number
  weeklyRead: number
  weeklyArticleRead: number
  income: number
  under2k: number
  '2k-5k': number
  '5k-10k': number
  '10k-30k': number
  '30k-100k': number
  over100k: number
  comments: number
  remark: string
  editing?: {
    [key: string]: boolean
  }
  editValue?: {
    [key: string]: string | number
  }
}>>([
  {
    date: dayjs(dateRange.value[1]).format('YYYY-MM-DD'),
    newFans: 100,
    totalFans: 10000,
    weeklyRead: 5000,
    weeklyArticleRead: 3000,
    income: 1000,
    under2k: 10,
    '2k-5k': 20,
    '5k-10k': 30,
    '10k-30k': 40,
    '30k-100k': 50,
    over100k: 60,
    comments: 100,
    remark: '备注信息',
    editing: {},
    editValue: {}
  }
  // 可以添加更多数据
])

// 监听日期范围变化
watch(dateRange, (newVal) => {
  if (tableData.value.length > 0) {
    tableData.value[0].date = dayjs(newVal[1]).format('YYYY-MM-DD')
  }
}, { deep: true })

// 设置默认日期范围（上周六到这周五）
const setDefaultDateRange = () => {
  // 获取当前时间
  const now = dayjs()
  // 获取本周五的时间
  // dayjs 的 day() 方法中，周日是 0，周一是 1，依此类推，周五是 5
  const friday = now.day(5)
  // 计算上周六的日期
  const lastSaturday = friday.subtract(6, 'day')

  dateRange.value = [lastSaturday.toDate(), friday.toDate()]
}

onMounted(() => {
  setDefaultDateRange()
})

// 复制文本
const copyText = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    ElMessage.success('复制成功')
  })
}

// 编辑单元格
const handleEdit = (row: any, prop: string) => {
  // 初始化编辑状态对象
  if (!row.editing) {
    row.editing = {}
  }
  if (!row.editValue) {
    row.editValue = {}
  }
  // 设置当前单元格的编辑状态
  row.editing[prop] = true
  row.editValue[prop] = row[prop]
}

// 保存编辑
const handleSave = (row: any, prop: string) => {
  row[prop] = row.editValue[prop]
  row.editing[prop] = false
}

// 取消编辑
const handleCancel = (row: any) => {
  row.editing = false
}
</script>

<template>
  <main>
    <div class="date-range">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :clearable="false"
        :shortcuts="[
          {
            text: '周',
            value: () => {
              // 获取当前时间
              const now = dayjs()
              // 获取本周五的时间
              // dayjs 的 day() 方法中，周日是 0，周一是 1，依此类推，周五是 5
              const friday = now.day(5)
              // 计算上周六的日期
              const lastSaturday = friday.subtract(6, 'day')
              return [lastSaturday.toDate(), friday.toDate()]
            },
          },
          {
            text: '月',
            value: () => {
              // 获取当前时间
              const now = dayjs()
              // 获取本月最后一天的时间
              const lastDayOfMonth = now.endOf('month').toDate()
              // 获取本月第一天的日期
              const firstDayOfMonth = now.startOf('month').toDate()
              return [firstDayOfMonth, lastDayOfMonth]
            },
          },
        ]"
        popper-class="date-picker-popper"
      />
    </div>

    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%" height="400">
        <el-table-column prop="date" label="日期" width="160" fixed>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row.date)">
              <span v-if="!row.editing?.date">{{ row.date }}</span>
              <el-date-picker
                v-else
                v-model="row.editValue.date"
                type="date"
                size="small"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                @change="handleSave(row, 'date')"
                @blur="handleSave(row, 'date')"
              />
              <el-button
                v-if="!row.editing?.date"
                type="primary"
                size="small"
                @click="handleEdit(row, 'date')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="newFans" label="增粉" width="80" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row.newFans)">
              <span v-if="!row.editing?.newFans">{{ row.newFans }}</span>
              <el-input
                v-else
                v-model="row.editValue.newFans"
                size="small"
                @keyup.enter="handleSave(row, 'newFans')"
                @blur="handleSave(row, 'newFans')"
              />
              <el-button
                v-if="!row.editing?.newFans"
                type="primary"
                size="small"
                @click="handleEdit(row, 'newFans')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="totalFans" label="总粉丝" width="100" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row.totalFans)">
              <span v-if="!row.editing?.totalFans">{{ row.totalFans }}</span>
              <el-input
                v-else
                v-model="row.editValue.totalFans"
                size="small"
                @keyup.enter="handleSave(row, 'totalFans')"
                @blur="handleSave(row, 'totalFans')"
              />
              <el-button
                v-if="!row.editing?.totalFans"
                type="primary"
                size="small"
                @click="handleEdit(row, 'totalFans')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="weeklyRead" label="本周阅读量" width="120" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row.weeklyRead)">
              <span v-if="!row.editing?.weeklyRead">{{ row.weeklyRead }}</span>
              <el-input
                v-else
                v-model="row.editValue.weeklyRead"
                size="small"
                @keyup.enter="handleSave(row, 'weeklyRead')"
                @blur="handleSave(row, 'weeklyRead')"
              />
              <el-button
                v-if="!row.editing?.weeklyRead"
                type="primary"
                size="small"
                @click="handleEdit(row, 'weeklyRead')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="weeklyArticleRead" label="本周发文阅读量" width="140" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row.weeklyArticleRead)">
              <span v-if="!row.editing?.weeklyArticleRead">{{ row.weeklyArticleRead }}</span>
              <el-input
                v-else
                v-model="row.editValue.weeklyArticleRead"
                size="small"
                @keyup.enter="handleSave(row, 'weeklyArticleRead')"
                @blur="handleSave(row, 'weeklyArticleRead')"
              />
              <el-button
                v-if="!row.editing?.weeklyArticleRead"
                type="primary"
                size="small"
                @click="handleEdit(row, 'weeklyArticleRead')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="income" label="收入" width="80" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row.income)">
              <span v-if="!row.editing?.income">{{ row.income }}</span>
              <el-input
                v-else
                v-model="row.editValue.income"
                size="small"
                @keyup.enter="handleSave(row, 'income')"
                @blur="handleSave(row, 'income')"
              />
              <el-button
                v-if="!row.editing?.income"
                type="primary"
                size="small"
                @click="handleEdit(row, 'income')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="under2k" label="2k以下" width="80" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row.under2k)">
              <span v-if="!row.editing?.under2k">{{ row.under2k }}</span>
              <el-input
                v-else
                v-model="row.editValue.under2k"
                size="small"
                @keyup.enter="handleSave(row, 'under2k')"
                @blur="handleSave(row, 'under2k')"
              />
              <el-button
                v-if="!row.editing?.under2k"
                type="primary"
                size="small"
                @click="handleEdit(row, 'under2k')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="2k-5k" label="2k-5k" width="80" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row['2k-5k'])">
              <span v-if="!row.editing?.['2k-5k']">{{ row['2k-5k'] }}</span>
              <el-input
                v-else
                v-model="row.editValue['2k-5k']"
                size="small"
                @keyup.enter="handleSave(row, '2k-5k')"
                @blur="handleSave(row, '2k-5k')"
              />
              <el-button
                v-if="!row.editing?.['2k-5k']"
                type="primary"
                size="small"
                @click="handleEdit(row, '2k-5k')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="5k-10k" label="5k-1W" width="80" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row['5k-10k'])">
              <span v-if="!row.editing?.['5k-10k']">{{ row['5k-10k'] }}</span>
              <el-input
                v-else
                v-model="row.editValue['5k-10k']"
                size="small"
                @keyup.enter="handleSave(row, '5k-10k')"
                @blur="handleSave(row, '5k-10k')"
              />
              <el-button
                v-if="!row.editing?.['5k-10k']"
                type="primary"
                size="small"
                @click="handleEdit(row, '5k-10k')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="10k-30k" label="1W-3W" width="80" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row['10k-30k'])">
              <span v-if="!row.editing?.['10k-30k']">{{ row['10k-30k'] }}</span>
              <el-input
                v-else
                v-model="row.editValue['10k-30k']"
                size="small"
                @keyup.enter="handleSave(row, '10k-30k')"
                @blur="handleSave(row, '10k-30k')"
              />
              <el-button
                v-if="!row.editing?.['10k-30k']"
                type="primary"
                size="small"
                @click="handleEdit(row, '10k-30k')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="30k-100k" label="3W-10W" width="80" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row['30k-100k'])">
              <span v-if="!row.editing?.['30k-100k']">{{ row['30k-100k'] }}</span>
              <el-input
                v-else
                v-model="row.editValue['30k-100k']"
                size="small"
                @keyup.enter="handleSave(row, '30k-100k')"
                @blur="handleSave(row, '30k-100k')"
              />
              <el-button
                v-if="!row.editing?.['30k-100k']"
                type="primary"
                size="small"
                @click="handleEdit(row, '30k-100k')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="over100k" label="10W以上" width="80" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row.over100k)">
              <span v-if="!row.editing?.over100k">{{ row.over100k }}</span>
              <el-input
                v-else
                v-model="row.editValue.over100k"
                size="small"
                @keyup.enter="handleSave(row, 'over100k')"
                @blur="handleSave(row, 'over100k')"
              />
              <el-button
                v-if="!row.editing?.over100k"
                type="primary"
                size="small"
                @click="handleEdit(row, 'over100k')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="comments" label="评论数" width="80" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row.comments)">
              <span v-if="!row.editing?.comments">{{ row.comments }}</span>
              <el-input
                v-else
                v-model="row.editValue.comments"
                size="small"
                @keyup.enter="handleSave(row, 'comments')"
                @blur="handleSave(row, 'comments')"
              />
              <el-button
                v-if="!row.editing?.comments"
                type="primary"
                size="small"
                @click="handleEdit(row, 'comments')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="cell-content" @dblclick="copyText(row.remark)">
              <span v-if="!row.editing?.remark">{{ row.remark }}</span>
              <el-input
                v-else
                v-model="row.editValue.remark"
                size="small"
                @keyup.enter="handleSave(row, 'remark')"
                @blur="handleSave(row, 'remark')"
              />
              <el-button
                v-if="!row.editing?.remark"
                type="primary"
                size="small"
                @click="handleEdit(row, 'remark')"
              >
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </main>
</template>

<style>
:root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  color-scheme: light dark;
  background-color: #242424;
}

@media (prefers-color-scheme: light) {
  :root {
    background-color: #fafafa;
  }
}

body {
  min-width: 20rem;
  color-scheme: light dark;
  height: 500px;
  width: 800px;
}

main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.date-range {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  padding: 0 1rem;
  width: 300px;
}

.table-container {
  margin-top: 1rem;
  padding: 0 1rem;
  flex: 1;
  overflow: hidden;
}

/* 调整日期选择器的样式 */
:deep(.el-date-editor) {
  width: 100% !important;
  height: 32px !important;
}

:deep(.el-date-editor .el-range-input) {
  width: 45% !important;
  font-size: 13px !important;
  height: 30px !important;
  line-height: 30px !important;
}

:deep(.el-date-editor .el-range-separator) {
  width: 10% !important;
  font-size: 13px !important;
  line-height: 30px !important;
}

:deep(.date-picker-popper) {
  min-width: 600px !important;
}

:deep(.el-picker-panel) {
  width: 600px !important;
}

:deep(.el-date-range-picker__content) {
  width: 50% !important;
}

:deep(.el-date-range-picker__header) {
  margin: 8px !important;
}

:deep(.el-date-range-picker__header div) {
  font-size: 14px !important;
}

:deep(.el-picker-panel__body) {
  min-width: 600px !important;
}

:deep(.el-date-table th) {
  padding: 4px !important;
  font-size: 13px !important;
}

:deep(.el-date-table td) {
  padding: 2px 0 !important;
  height: 28px !important;
}

:deep(.el-date-table td .el-date-table-cell__text) {
  width: 22px !important;
  height: 22px !important;
  line-height: 22px !important;
  font-size: 13px !important;
}

:deep(.el-picker-panel__icon-btn) {
  margin-top: 4px !important;
}

:deep(.el-date-range-picker__time-header) {
  padding: 8px !important;
}

:deep(.el-date-range-picker__editors-wrap) {
  padding: 6px !important;
}

:deep(.el-date-range-picker__time-picker-wrap) {
  padding: 0 8px !important;
}

:deep(.el-time-panel) {
  width: 200px !important;
}

:deep(.el-time-spinner__wrapper) {
  width: 66px !important;
}

:deep(.el-time-spinner__item) {
  height: 28px !important;
  line-height: 28px !important;
  font-size: 13px !important;
}

/* 表格样式 */
:deep(.el-table) {
  font-size: 13px !important;
}

:deep(.el-table th) {
  background-color: #f5f7fa !important;
  color: #606266 !important;
  font-weight: 500 !important;
  padding: 8px 0 !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

:deep(.el-table td) {
  padding: 6px 0 !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

:deep(.el-table--border) {
  border: 1px solid #ebeef5 !important;
}

:deep(.el-table--border th),
:deep(.el-table--border td) {
  border-right: 1px solid #ebeef5 !important;
}

:deep(.el-table--border::after),
:deep(.el-table--border::before) {
  background-color: #ebeef5 !important;
}

:deep(.el-table__body-wrapper) {
  overflow-x: auto !important;
}

:deep(.el-table__fixed) {
  height: 100% !important;
}

:deep(.el-table__fixed-right) {
  height: 100% !important;
}

:deep(.el-table__fixed-header-wrapper) {
  z-index: 2 !important;
}

:deep(.el-table__fixed-body-wrapper) {
  z-index: 1 !important;
}

/* 单元格内容样式 */
.cell-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  cursor: pointer;
  gap: 8px;
}

.cell-content:hover {
  background-color: #f5f7fa;
}

.cell-content .el-button {
  opacity: 0;
  transition: opacity 0.3s;
  margin-left: 8px;
}

.cell-content:hover .el-button {
  opacity: 1;
}

.cell-content .el-input {
  width: 100%;
}

/* 消息提示样式 */
:deep(.el-message) {
  min-width: 0 !important;
  padding: 8px 16px !important;
}

:deep(.el-message__content) {
  font-size: 13px !important;
}
</style>
