const baseUrl = 'https://developer.salesforce.com/docs/component-library/bundle';

const directories = ['lightning-accordion', 'lightning-accordion-section', 'lightning-avatar', 'lightning-badge', 'lightning-breadcrumb', 'lightning-breadcrumbs', 'lightning-button', 'lightning-button-group', 'lightning-button-icon', 'lightning-button-icon-stateful', 'lightning-button-menu', 'lightning-button-stateful', 'lightning-card', 'lightning-carousel', 'lightning-carousel-image', 'lightning-checkbox-group', 'lightning-click-to-dial', 'lightning-combobox', 'lightning-datatable', 'lightning-dual-listbox', 'lightning-dynamic-icon', 'lightning-emp-api', 'lightning-file-upload', 'lightning-flow-support', 'lightning-formatted-address', 'lightning-formatted-date-time', 'lightning-formatted-email', 'lightning-formatted-location', 'lightning-formatted-name', 'lightning-formatted-number', 'lightning-formatted-phone', 'lightning-formatted-rich-text', 'lightning-formatted-text', 'lightning-formatted-time', 'lightning-formatted-url', 'lightning-helptext', 'lightning-icon', 'lightning-input', 'lightning-input-address', 'lightning-input-field', 'lightning-input-location', 'lightning-input-name', 'lightning-input-rich-text', 'lightning-layout', 'lightning-layout-item', 'lightning-map', 'lightning-menu-item', 'lightning-message-service', 'lightning-navigation', 'lightning-output-field', 'lightning-page-reference-utils', 'lightning-pill', 'lightning-pill-container', 'lightning-platform-resource-loader', 'lightning-platform-show-toast-event', 'lightning-progress-bar', 'lightning-progress-indicator', 'lightning-progress-ring', 'lightning-progress-step', 'lightning-radio-group', 'lightning-record-edit-form', 'lightning-record-form', 'lightning-record-view-form', 'lightning-relative-date-time', 'lightning-rich-text-toolbar-button', 'lightning-rich-text-toolbar-button-group', 'lightning-slider', 'lightning-spinner', 'lightning-tab', 'lightning-tabset', 'lightning-textarea', 'lightning-tile', 'lightning-tree', 'lightning-tree-grid', 'lightning-ui-apps-api', 'lightning-ui-list-api', 'lightning-ui-object-info-api', 'lightning-ui-record-api', 'lightning-vertical-navigation', 'lightning-vertical-navigation-item', 'lightning-vertical-navigation-item-badge', 'lightning-vertical-navigation-item-icon'];

const urls = [{
  name: 'lightning-accordion',
  docs: `${baseUrl}/lightning-accordion/documentation`,
  specs: `${baseUrl}/lightning-accordion/specification`
}, {
  name: 'lightning-accordion-section',
  docs: `${baseUrl}/lightning-accordion-section/documentation`,
  specs: `${baseUrl}/lightning-accordion-section/specification`
}]

module.exports = {
  urls,
  directories,
  baseUrl
};