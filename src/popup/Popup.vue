<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElDatePicker } from 'element-plus'
import dayjs from 'dayjs'
import 'element-plus/dist/index.css'

// 日期范围
const dateRange = ref<[Date, Date]>([new Date(), new Date()])

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
  width: 800px;
  height: 500px;
}

main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
  min-width: 800px;
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
</style>
