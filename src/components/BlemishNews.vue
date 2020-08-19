<template>
    <div class="blemish-news-container">
        <el-row>
            <el-col :span="24">
              <transition name="el-fade-in-linear">
                <el-card  v-show="show" class="box-card search-card">
                    <el-row style="margin-top: -10px;">
                        <el-col :span="6">
                            <el-input v-model="nameSearchContent" placeholder="模糊匹配 (eg: Donald Trump)" v-on:input="contentChange"></el-input>
                        </el-col>
                        <el-col :span="18">
                          <transition name="el-zoom-in-center">
                            <el-card v-show="list_show" class="box-card news-count">污点劣迹新闻总数:  <span style="color: red;"><b>{{ news_count }}</b></span></el-card>
                          </transition>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 10px;">
                        <el-col :span="6">
                            <el-input v-model="keywordSearchContent" placeholder="污点劣迹关键词 (eg: gay)" v-on:input="contentChange"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="success" style="margin-left: 30px;" :loading="loading" @click="blemishNewsExport()">导出</el-button>
                        </el-col>
                    </el-row>
                </el-card>
              </transition>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
              <transition name="el-zoom-in-top">
                <el-card v-show="list_show" class="box-card news-show-card">
                  <template>
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column
                        label="序号"
                        width="80">
                            <template slot-scope="scope">
                                <span>{{ pageSize * (currentPage - 1) + scope.$index  + 1 }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                        label="污点劣迹"
                        width="200">
                            <template slot-scope="scope">
                               <span style="font-size: 10px;"><el-tag type="danger">{{ scope.row.keyword }}</el-tag></span>
                            </template>
                        </el-table-column>

                        <el-table-column
                        label="新闻标题"
                        width="640">
                            <template slot-scope="scope">
                               <span style="font-size: 10px;"><a :href="scope.row.url">{{ scope.row.title.substring(0, 95) }}</a></span>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作"
                         width="150">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                @click="viewCheck(scope.$index, scope.row)">查看</el-button>
                                <el-button
                                size="mini"
                                @click="translateCheck(scope.$index, scope.row)">翻译</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <el-pagination
                style="float: right; margin-top:15px;"
                @current-change="handleCurrentChange"
                background
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                </el-card>
              </transition>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  data () {
    return {
      news_count: 0,
      nameSearchContent: null,
      keywordSearchContent: null,
      tableData: [],
      currentPage: 1,
      pageSize: 8,
      total: 0,
      loading: false,
      show: false,
      list_show: false
    }
  },
  methods: {
    contentChange () {
      this.blemishSearch(1, 8)
    },
    handleCurrentChange (val) {
      this.blemishSearch(val, 8)
    },
    viewCheck (index, row) {
      var title = row.title
      var content = row.content
      this.$alert('<p style="color: blue; text-align: center;">' + title + '</p>' +
      '<p style="font-size: 10px;">' + content + '</p>',
      '原文查看', {
        dangerouslyUseHTMLString: true
      })
    },
    translateCheck (index, row) {
      this.$message('正在调用百度翻译API进行翻译!')
      const url = 'http://106.13.64.244:8082/blemish/news/translate'
      this.$axios.get(url, {
        params: {
          url: row.url
        }
      }).then((response) => {
        var data = response.data
        this.$alert('<p style="color: blue; text-align: center;">' + data.title + '</p>' +
        '<p style="font-size: 10px;">' + data.content + '</p>',
        '百度翻译', {
          dangerouslyUseHTMLString: true
        })
      })
    },
    blemishNewsExport () {
      this.$message('开始导出Json文件!请耐心等待!')
      this.loading = true
      const url = 'http://106.13.64.244:8082/blemish/news/export'
      this.$axios({
        method: 'post',
        url: url,
        reponseType: 'blob',
        params: {
          currentPage: 1,
          pageSize: 10000,
          name: this.nameSearchContent,
          keyword: this.keywordSearchContent
        }
      }).then((response) => {
        const blob = new Blob([response.data])
        const fileName = 'Blemish_News.json'
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
        this.loading = false
      })
    },
    blemishSearch (currentPage, pageSize) {
      this.list_show = false
      if (this.nameSearchContent === '') {
        this.nameSearchContent = null
      }
      if (this.keywordSearchContent === '') {
        this.keywordSearchContent = null
      }
      const url = 'http://106.13.64.244:8082/blemish/news/search'
      this.$axios.get(url, {
        params: {
          currentPage: currentPage,
          pageSize: pageSize,
          name: this.nameSearchContent,
          keyword: this.keywordSearchContent
        }
      }).then((response) => {
        var data = response.data.data
        var tableData = []
        for (var index in data) {
          var json = data[index]
          var keyword = json.keyword
          var title = json.title
          var url = json.url
          var content = json.content
          tableData.push({
            keyword: keyword,
            title: title,
            url: url,
            content: content
          })
        }
        this.total = response.data.total
        this.news_count = response.data.total
        this.tableData = tableData
        this.currentPage = currentPage
        this.pageSize = pageSize
        this.show = true
        this.list_show = true
      })
    }
  },
  mounted () {
    this.blemishSearch(1, 8)
  }
}
</script>
<style>
.news-count {
  margin: 0px auto;
  text-align: center;
  color: white !important;
  width: 190px;
  height: 38px !important;
  line-height: 38px;
  background-color: #63c33b !important;
  font-size: 15px;
}
.news-count .el-card__body {
  padding: 0px;
}
.search-card {
    height: 110px;
}
.news-show-card {
    margin-top: 15px;
    height: 425px;
}
.el-tag {
    height: 25px !important;
    line-height: 23px !important;
}
.el-message-box__container {
    height: 500px;
    overflow-y: scroll;
}
.el-message-box {
    width: 800px !important;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  border-radius: 0px;
  background: none;
}
/*滑块*/
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
  background-color: rgba(255,255,255,.75)
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
  background-color: rgba(85, 85, 85, 0.4);
}
</style>
