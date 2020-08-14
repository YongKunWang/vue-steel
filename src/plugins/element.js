import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  MessageBox,
  Container,
  Footer,
  Main,
  Aside,
  Header,
  Icon,
  Menu,
  MenuItem,
  Submenu,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
