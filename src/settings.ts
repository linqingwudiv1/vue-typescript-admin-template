interface ISettings {
  /**
   * Overrides the default title
   */
  title: string
  /**
   *  Controls settings panel display
   */
  showSettings: boolean
  /**
   * Controls tagsview display
   */
  showTagsView: boolean
  /**
   * Controls siderbar logo display
   */
  showSidebarLogo: boolean
  /**
   *  If true, will fix the header component
   */
  fixedHeader: boolean
  /**
   * The env to enable the errorlog component, default 'production' only
   */
  errorLog: string[]
  /**
   * If true, will change active text color for sidebar based on theme
   */
  sidebarTextTheme: boolean
  /**
   * Port number for webpack-dev-server
   */
  devServerPort: number

  /**
   * default language from i18n
   */
  language:string
}

// You can customize below settings :)
const settings: ISettings = {
  title: 'Admin 中控管理平台',
  showSettings: true,
  showTagsView: true,
  fixedHeader: false,
  showSidebarLogo: true,
  errorLog: ['production'],
  sidebarTextTheme: true,
  devServerPort: 9527,
  language: 'zh-cn'
}

export default settings
