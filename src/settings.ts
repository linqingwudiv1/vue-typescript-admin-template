interface ISettings {
  /**
   * Overrides the default title
   */
  title: string 
  /**
   *  Controls settings panel display
   */
  showSettings: boolean; 
  /**
   * Controls tagsview display
   */
  showTagsView: boolean; 
  /**
   * Controls siderbar logo display
   */
  showSidebarLogo: boolean; 
  /**
   *  If true, will fix the header component
   */
  fixedHeader: boolean;
  /**
   * The env to enable the errorlog component, default 'production' only
   */
  errorLog: string[]; 
  /**
   * If true, will change active text color for sidebar based on theme
   */
  sidebarTextTheme: boolean; 
  /**
   * Port number for webpack-dev-server
   */
  devServerPort: number; 
}

// You can customize below settings :)
const settings: ISettings = {
  title: 'Vue Typescript Admin',
  showSettings: true,
  showTagsView: true,
  fixedHeader: false,
  showSidebarLogo: false,
  errorLog: ['production'],
  sidebarTextTheme: true,
  devServerPort: 9527,
};

export default settings;
