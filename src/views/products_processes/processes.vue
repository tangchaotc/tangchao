<!--
 * @Descripttion: 
 * @version: 
 * @Author: 唐超
 * @Date: 2020-06-04 22:25:01
 * @LastEditors: 唐超
 * @LastEditTime: 2020-06-14 22:39:20
--> 
<!--
 * @Descripttion: 
 * @version: 
 * @Author: 唐超
 * @Date: 2020-06-02 09:39:18
 * @LastEditors: 唐超
 * @LastEditTime: 2020-06-04 21:30:19--> 
<template>
  <el-row>
    <el-col :span="24">
      <div class="grid">
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="序号">
            <el-input v-model="search.id" label-width="80px" size="mini" clearable></el-input>
          </el-form-item>
          <el-form-item label="工序编号">
            <el-input v-model="search.serial_number" label-width="80px" size="mini" clearable></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="search.order_number" label-width="80px" size="mini" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchs" icon="el-icon-search" size="small">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="refresh" icon="el-icon-refresh" size="small">刷新</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="exportBtu" icon="el-icon-printer" size="small">导出</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              @click="dialogVisible=true"
              icon="el-icon-plus"
              size="small"
            >新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>

    <el-col :span="24" class="mainbox">
      <div class="grid-content">
        <el-table :data="tableData" border class="bk" id="export">
          <el-table-column prop="id" label="序号" width="40px" align="center" type="index"></el-table-column>
          <el-table-column prop="cz" label="操作" width="200px" align="center" type="index">
            <template slot-scope="scope">
              <el-button type="success" @click="handleEdit(scope.$index, scope.row)" size="small">编辑</el-button>
              <el-button type="success" @click="remove(scope.row.id)" size="small">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="order_number" label="订单号" width="80px" align="center"></el-table-column>
          <el-table-column prop="name" label="名称" width="100px" align="center"></el-table-column>
          <el-table-column prop="serial_number" label="工序编号" width="100px" align="center"></el-table-column>
          <el-table-column prop="product_model" label="产品型号" width="120px" align="center"></el-table-column>
          <el-table-column prop="structure" label="缆芯结构" width="120px" align="center"></el-table-column>
          <el-table-column prop="build_line" label="指定生产线" width="120px" align="center"></el-table-column>
          <el-table-column prop="line_speed" label="线速度" width="80px" align="center"></el-table-column>
          <el-table-column prop="isEnabled" label="是否有效" width="80px" align="center"></el-table-column>
        </el-table>
      </div>
    </el-col>

    <!-- 新增 -->
    <el-dialog title="工艺模块新增" :visible.sync="dialogVisible">
      <el-form :model="addForm" ref="UserRef">
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input v-model="addForm.order_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工序编号" :label-width="formLabelWidth">
          <el-input v-model="addForm.serial_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品型号" :label-width="formLabelWidth">
          <el-input v-model="addForm.product_model" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="缆芯结构" :label-width="formLabelWidth">
          <el-input v-model="addForm.structure" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="指定生产线" :label-width="formLabelWidth">
          <el-input v-model="addForm.build_line" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="线速度" :label-width="formLabelWidth">
          <el-input v-model="addForm.line_speed" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有效" :label-width="formLabelWidth">
          <el-input v-model="addForm.isEnabled" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel ">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="工艺模块编辑" :visible.sync="editFormVisible">
      <el-form :model="editForm" ref="updateRef">
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="editForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input v-model="editForm.order_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工序编号" :label-width="formLabelWidth">
          <el-input v-model="editForm.serial_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品型号" :label-width="formLabelWidth">
          <el-input v-model="editForm.product_model" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="缆芯结构" :label-width="formLabelWidth">
          <el-input v-model="editForm.structure" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="指定生产线" :label-width="formLabelWidth">
          <el-input v-model="editForm.build_line" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="线速度" :label-width="formLabelWidth">
          <el-input v-model="editForm.line_speed" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有效" :label-width="formLabelWidth">
          <el-input v-model="editForm.isEnabled" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancels ">取 消</el-button>
        <el-button type="primary" @click="handleUpdate ">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>


<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  inject: ["reload"], // 引入方法
  data() {
    return {
      search: {},
      tableData: {},

      //  新增页面
      dialogVisible: false,
      addForm: {},
      formLabelWidth: "120px",

      // 编辑页面
      editFormVisible: false,
      editForm: {},
      formLabelWidth: "120px"
    };
  },

  // 显示表格所有数据,调用feach()方法
  created() {
    this.feach();
  },

  methods: {
    // 编辑
    handleEdit(index, row) {
      // 设置弹出框显示
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    // 编辑确定
    handleUpdate() {
      this.$axios
        .put(`/craft/${this.$route.params.id}`, this.editForm)
        .then(res => {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        });
      this.editFormVisible = false;
      this.feach();
    },
    // 编辑取消
    handleCancels() {
      this.editFormVisible = false;
    },


    // 新增确定
    handleAdd() {
      this.$axios.post("/craft", this.addForm).then(res => {
        this.$message({
          message: "创建成功",
          type: "success"
        });
        this.feach();
      });
      this.dialogVisible = false;
      this.addForm = {};
    },
    // 新增取消
    handleCancel() {
      this.dialogVisible = false;
      this.addForm = {};
    },


    // 刷新
    refresh() {
      this.reload(); // 调用方法
    },


    // 导出==#export:导出的表格id
    exportBtu() {
      var wb = XLSX.utils.table_to_book(document.querySelector("#export"));
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          // 导出的名字
          "工序模板.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") 
        console.log(e, wbout);
      }
      return wbout;
    },


    // 搜索
    searchs() {
      // 要查询到参数
      var id = this.search.id;
      var serial_number = this.search.serial_number;
      var order_number = this.search.order_number;
      this.$axios.get("/crafts", {
        // 后台传来来的参数
          params: {
            id: id,
            serial_number: serial_number,
            order_number: order_number
          }
        })
        .then(res => {
          console.log(res);
          // 查询到结果
          this.tableData = res.data;
          // 没有查询参数显示整个表格数据
           if(this.search.id===''&&this.search.serial_number===''&&this.search.order_number===''){
            //  重新发请求
             this.feach()
        }
        })
        .catch(error => {
          console.log(error);
        });
    },


    // 查询所有方法
    feach() {
      this.$axios.get("/craft").then(res => {
        console.log(res.data);
        this.tableData = res.data;
      });
    },


    // 删除
    remove(id) {
      this.$confirm("您确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 后台传的id
          this.$axios.delete(`/craft/${id}`).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.feach();
          });
        })
        .catch(() => {
          this.$message({
            message: "您已取消删除",
            type: "success"
          });
        });
    }
  }
};
</script>

<style lang="scss">
.demo-form-inline {
  margin-top: 18px;
  margin-left: 18px;
}
.grid-content .bk {
  border: 1px solid rgba(25, 186, 139, 0.17);
  margin-left: 5px;
  margin-right: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.mainbox {
  border: 1px solid rgba(25, 186, 139, 0.17);
  margin-left: 15px;
  margin-right: "10%";
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>