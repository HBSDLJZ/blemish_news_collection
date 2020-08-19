<template>
    <div class="blemish-tag-container">
        <el-row>
            <el-col :span="6">
                <tag-cloud :data="hotTag" style="margin-left:150px;margin-top: 30px;"></tag-cloud>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  data () {
    return {
      hotTag: []
    }
  },
  methods: {
    loadBlemishTag () {
      const url = 'http://106.13.64.244:8082/blemish/list'
      this.$axios.get(url, {
        params: {
        }
      }).then((response) => {
        this.hotTag = []
        var data = response.data
        for (var index in data) {
          var blemish = data[index]
          var tag = {}
          tag.id = blemish.id
          tag.name = blemish.keyword
          this.hotTag.push(tag)
        }
      })
    }
  },
  mounted () {
    this.loadBlemishTag()
  }
}
</script>
<style>
</style>
