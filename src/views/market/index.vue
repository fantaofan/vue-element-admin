<template>
  <div>
    <el-transfer
      v-model="value2"
      :data="data2"
      :titles="['所有市场部', '当前市场部']"
    />
  </div>
</template>

<script>
export default {
  data() {
    const generateData2 = _ => {
      const data = []
      const cities = ['上海', '北京', '广州', '深圳']
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        })
      })
      return data
    }
    return {
      data2: generateData2(),
      value2: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1
      }
    }
  }
}
</script>
