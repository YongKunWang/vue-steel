<template>
    <div>
      <!--主体为卡片-->
      <el-card class="box-card" :body-style="{padding: '0 10px 0 10px'}">
        <!--标题-->
        <el-row class="box-header">
        </el-row>
        <!--图像显示部分-->
        <el-row :gutter="5">
          <!--原始的图像界面-->
          <el-col :span="12">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="image-continer">
                <a :href="pre_image_url">
                  <img id="img-clip1" :src="pre_image_url" alt="">
                </a>
              </div>
            </el-card>
          </el-col>
          <!-- 识别后的图像界面-->
          <el-col :span="12">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="image-continer">
                <a :href="after_image_url">
                  <img id="img-clip2" :src="after_image_url" alt="">
                </a>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
      <el-row>
        <!--报警信息显示部分-->
        <el-card :body-style="{padding: '0'}" class="warnning-display">
<!--          <h2>报警详情</h2>-->
          <template>
            <el-table :data="warnData" max-height="370" style="width: 100%" stripe border align="center">
              <el-table-column type="index" align="center" label="#"></el-table-column>
              <el-table-column prop="date" label="时间" align="center">
              </el-table-column>
              <el-table-column prop="local" label="地点"  align="center">
              </el-table-column>
              <el-table-column prop="number" label="监控编号"  align="center">
              </el-table-column>
              <el-table-column label="是否报警"  align="center">
                <template slot-scope="scope">
                  <i v-if="scope.row.isAlert" class="el-icon-message-solid warnIcon"></i>
                  <i v-else class="el-icon-message-solid normalIcon"></i>
                </template>
              </el-table-column>
              <el-table-column prop="alertInfo" label="报警详情"  align="center">
              </el-table-column>
              <el-table-column prop="alertManage" label="详情管理"  align="center">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="详情处理" placement="top">
                    <el-button type="primary" icon="el-icon-edit" size="small" @click="dealByUser(scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="忽略警报" placement="top">
                    <el-button type="danger" icon="el-icon-setting" size="small" @click="ignoreByUser(scope.row)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="isDeal" label="事件处理"  align="center">
                <template slot-scope="scope">
                  <el-tag v-if="(scope.row.isAlert === false) && (scope.row.isDeal === true)" type="success" effect="dark">正常情况</el-tag>
                  <el-tag v-else-if="(scope.row.isAlert === true) && (scope.row.isDeal === true)" type="success" effect="dark">已经处理</el-tag>
                  <el-tag v-else-if="(scope.row.isAlert === true) && (scope.row.isDeal === false)" type="danger" effect="dark">未经处理</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-card>
      </el-row>

<!--   异常情况下的dialog-->
<!--   详情dialog-->
      <el-dialog
        title="报警详情管理"
        :visible.sync="warn_deal_dialogVisible"
        width="50%"
        @close="warnInfoDealFormClosed">
        <el-form :inline="true" label-position="right" label-width="120px" :model="warnDealDateForm" :rules="warnDealDateFormRules" ref="warnInfoDealRef">

          <el-form-item label="报警编号:">
            <el-input v-model="warnDealDateForm.warnDataId" disabled></el-input>
          </el-form-item>
          <el-form-item label="处理人员:" prop="userDeal">
            <el-input v-model="warnDealDateForm.userDeal" style="width: 219px" placeholder="请输入处理人姓名"></el-input>
          </el-form-item>

          <el-form-item label="报警时间:">
            <el-input v-model="warnDealDateForm.warnDataDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="开始时间:" prop="dealStartTime">
            <el-date-picker
              v-model="warnDealDateForm.dealStartTime"
              type="datetime"
              placeholder="请选择报警处理开始时间"
              align="right"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="报警地点:">
            <el-input v-model="warnDealDateForm.warnLocal" disabled></el-input>
          </el-form-item>
          <el-form-item label="结束时间:" prop="dealEndTime">
            <el-date-picker
              v-model="warnDealDateForm.dealEndTime"
              type="datetime"
              placeholder="请选择处理预结束时间"
              align="right"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="监控编号:">
            <el-input v-model="warnDealDateForm.warnNumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="处理状态:" prop="dealStatus">
            <el-select v-model="warnDealDateForm.dealStatus" placeholder="请选择报警处理状态" style="width: 219px">
              <el-option :value="false" label="未经处理"></el-option>
              <el-option :value="true" label="已经处理"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="报警信息:">
            <el-input v-model="warnDealDateForm.warnInfo" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注信息:" prop="dealRemark">
            <el-input type="textarea" v-model="warnDealDateForm.dealRemark" style="width: 219px"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="warn_deal_dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="warn_deal_dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'MonitorTen',
  data () {
    return {
      // 识别前的图像网址
      pre_image_url: '',
      // 识别后的图像网址
      after_image_url: '',
      // table的数据，采用时间倒序
      // 这些数据是python识别算法传过来的原始数据，对于用户只读
      // 这些数据字段单独建表！
      warnData: [
        {
          id: 6,
          date: '2020-08-16 05:00:00',
          local: '西门1',
          number: '监控摄像头10',
          isAlert: true,
          alertInfo: '落叶',
          isDeal: false
        },
        {
          id: 5,
          date: '2020-08-16 04:00:00',
          local: '西门1',
          number: '监控摄像头10',
          isAlert: true,
          alertInfo: '油污',
          isDeal: false
        },
        {
          id: 4,
          date: '2020-08-16 03:25:00',
          local: '西门1',
          number: '监控摄像头10',
          isAlert: true,
          alertInfo: '油污',
          isDeal: false
        },
        {
          id: 3,
          date: '2020-08-16 03:00:00',
          local: '西门1',
          number: '监控摄像头10',
          isAlert: false,
          alertInfo: '无异常',
          isDeal: true
        },
        {
          id: 2,
          date: '2020-08-16 02:00:00',
          local: '西门1',
          number: '监控摄像头10',
          isAlert: false,
          alertInfo: '无异常',
          isDeal: true
        },
        {
          id: 1,
          date: '2020-08-16 01:00:00',
          local: '西门1',
          number: '监控摄像头10',
          isAlert: false,
          alertInfo: '无异常',
          isDeal: true
        }
      ],

      // 详情管理的dialog操作
      // 有报警时的详情页的dialog
      warn_deal_dialogVisible: false,
      // 有报警时的忽略按键采用message弹框

      // 遇到报警的时的用户表单数据
      warnDealDateForm: {

        warnDataId: '',
        warnDataDate: '',
        warnLocal: '',
        warnNumber: '',
        warnInfo: '',

        // 处理人
        userDeal: '',
        // 处理时间
        dealStartTime: '',
        // 处理时长
        dealEndTime: '',
        // 处理状态
        dealStatus: '',
        // 备注
        dealRemark: ''
      },
      // 表单规则设置
      warnDealDateFormRules: {
        userDeal: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        // 时间格式
        dealStartTime: [
          { required: true, message: '请选择事件处理开始时间', trigger: 'blur' }
        ],
        dealEndTime: [
          { required: true, message: '请选择事件处理结束时间', trigger: 'blur' }
        ],
        dealStatus: [
          { required: true, message: '请选择事件处理状态', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '明天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }]
      },
      // 页面定时器
      monitorTenInterVal: null
    }
  },
  created () {
    this.getImage()
    this.dataRefresh()
  },
  methods: {
    // 获得原始图像和识别后的图像
    async getImage () {
      const { data: res } = await this.$http.get('item/monitor/preimages/10')
      console.log(res)
      if (res.meta.status !== 1000) {
        return this.$message.warning(`${res.meta.msg}`)
      }
      this.pre_image_url = res.data.pre_image_url
      this.after_image_url = res.data.after_image_url
    },
    // 详情处理的按键函数
    dealByUser (warnData) {
      // 如果未发生报警
      // 详情处理的未报警方法
      if (warnData.isAlert === false) {
        // 当按下详情处理时给一个message消息提示
        this.$message.success('监控无异常，无需任何操作')
      }

      // 如果发生报警
      // 详情处理的报警方法
      if (warnData.isAlert === true) {
        // 在dialog中进行显示
        this.warnDealDateForm.warnDataId = warnData.id
        this.warnDealDateForm.warnDataDate = warnData.date
        this.warnDealDateForm.warnLocal = warnData.local
        this.warnDealDateForm.warnNumber = warnData.number
        this.warnDealDateForm.warnInfo = warnData.alertInfo

        // dialog标志位
        this.warn_deal_dialogVisible = true
      }
    },
    // 忽略的未报警方法
    ignoreByUser (warnData) {
      // 如果未发生报警
      // 忽略处理的未报警方法
      if (warnData.isAlert === false) {
        // 当按下详情处理时给一个message消息提示
        this.$message.error('监控无异常，无需忽略')
      }
    },
    // 忽略的报警方法

    // 重置dialog中的数据 在关闭和取消的时候
    warnInfoDealFormClosed () {
      this.$refs.warnInfoDealRef.resetFields()
    },
    dataTimer () {
      console.log('定时 ' + new Date())
      this.getImage()
    },
    // 页面定时器的实现
    dataRefresh () {
      // 页面定时器正在执行中...
      if (this.monitorTenInterVal != null) {
        return
      }
      // 30S的定时
      this.monitorTenInterVal = setInterval(this.dataTimer, 10000)
    }
  },
  beforeDestroy () {
    clearInterval(this.monitorTenInterVal)
    this.monitorTenInterVal = null
  }
}
</script>

<style lang="less" scoped>
.box-card {
  height: 359px;
  width: 100%;

  .box-header {
    margin-bottom: 10px;
    text-align: center;
  }
}
  .image-continer {
    width: 100%;
    height: 332px;
    /*border: 1px solid red;*/
    position: relative;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
  #img-clip1,
  #img-clip2 {
    position: absolute;
    top: -131px;
    left: 0px;
    clip: rect(129px 601px 470px 0);
  }

  .warnning-display {
    height: 370px;
    text-align: center;
  }

  .warnIcon {
    font-size: 30px;
    color: red;
    font-weight: bold;
  }
  .normalIcon {
    font-size: 30px;
    color: #55a532;
    font-weight: bold;
  }
</style>
