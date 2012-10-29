/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var App = require('app');

App.InstallerController = Em.Controller.extend({

  name: 'installerController',

  isStepDisabled: [],

  totalSteps: 10,

  init: function () {
    this.clusters = App.Cluster.find();
    this.isStepDisabled.pushObject(Ember.Object.create({
      step: 1,
      value: false
    }));
    for (var i = 2; i <= this.totalSteps; i++) {
      this.isStepDisabled.pushObject(Ember.Object.create({
        step: i,
        value: true
      }));
    }
    // window.onbeforeunload = function () {
    // return "You have not saved your document yet.  If you continue, your work will not be saved."
    //}
  },

  setStepsEnable: function () {
    for (var i = 2; i <= this.totalSteps; i++) {
      var step = this.get('isStepDisabled').findProperty('step', i);
      if (i <= this.get('currentStep')) {
        step.set('value', false);
      } else {
        step.set('value', true);
      }
    }
  }.observes('currentStep'),

  prevInstallStatus: function () {
    console.log('Inside the prevInstallStep function: The name is ' + App.router.get('loginController.loginName'));
    var result = App.db.isCompleted()
    if (result == '1') {
      return true;
    }
  }.property('App.router.loginController.loginName'),

  currentStep: function () {
    return App.get('router').getInstallerCurrentStep();
  }.property(),

  clusters: null,

  isStep1: function () {
    return this.get('currentStep') == 1;
  }.property('currentStep'),

  isStep2: function () {
    return this.get('currentStep') == 2;
  }.property('currentStep'),

  isStep3: function () {
    return this.get('currentStep') == 3;
  }.property('currentStep'),

  isStep4: function () {
    return this.get('currentStep') == 4;
  }.property('currentStep'),

  isStep5: function () {
    return this.get('currentStep') == 5;
  }.property('currentStep'),

  isStep6: function () {
    return this.get('currentStep') == 6;
  }.property('currentStep'),

  isStep7: function () {
    return this.get('currentStep') == 7;
  }.property('currentStep'),

  isStep8: function () {
    return this.get('currentStep') == 8;
  }.property('currentStep'),

  isStep9: function () {
    return this.get('currentStep') == 9;
  }.property('currentStep'),

  isStep10: function () {
    return this.get('currentStep') == 10;
  }.property('currentStep'),

  gotoStep1: function () {
    if (this.get('isStepDisabled').findProperty('step', 1).get('value') === true) {
      return;
    } else {
      App.router.send('gotoStep1');
    }

  },

  gotoStep2: function () {
    if (this.get('isStepDisabled').findProperty('step', 2).get('value') === true) {
      return;
    } else {
      App.router.send('gotoStep2');
    }

  },

  gotoStep3: function () {
    if (this.get('isStepDisabled').findProperty('step', 3).get('value') === true) {
      return;
    } else {
      App.router.send('gotoStep3');
    }

  },

  gotoStep4: function () {

    if (this.get('isStepDisabled').findProperty('step', 4).get('value') === true) {
      return;
    } else {
      App.router.send('gotoStep4');
    }
  },

  gotoStep5: function () {
    if (this.get('isStepDisabled').findProperty('step', 5).get('value') === true) {
      return;
    } else {
      App.router.send('gotoStep5');
    }
  },

  gotoStep6: function () {
    if (this.get('isStepDisabled').findProperty('step', 6).get('value') === true) {
      return;
    } else {
      App.router.send('gotoStep6');
    }

  },

  gotoStep7: function () {
    if (this.get('isStepDisabled').findProperty('step', 7).get('value') === true) {
      return;
    } else {
      App.router.send('gotoStep7');
    }
  },

  gotoStep8: function () {
    if (this.get('isStepDisabled').findProperty('step', 8).get('value') === true) {
      return;
    } else {
      App.router.send('gotoStep8');
    }
  },

  gotoStep9: function () {
    if (this.get('isStepDisabled').findProperty('step', 9).get('value') === true) {
      return;
    } else {
      App.router.send('gotoStep9');
    }
  },

  gotoStep10: function () {
    if (this.get('isStepDisabled').findProperty('step', 10).get('value') === true) {
      return;
    } else {
      App.router.send('gotoStep10');
    }
  },

  /**
   *
   * @param cluster ClusterModel
   */
  createCluster: function (cluster) {
    alert('created cluster ' + cluster.name);
  },

  content: Em.Object.create({
    cluster: null,
    hosts: null,
    services: null,
    hostsInfo: null,
    slaveComponentHosts: null,
    hostSlaveComponents: null,
    masterComponentHosts: null,
    hostToMasterComponent : null,
    serviceConfigProperties: null
  }),

  /**
   * Load clusterInfo(step1) to model
   */
  loadClusterInfo: function () {
    var cStatus = App.db.getClusterStatus() || {status: "", isCompleted: false};
    var cluster = {
      name: App.db.getClusterName() || "",
      status: cStatus.status,
      isCompleted: cStatus.isCompleted
    };
    this.set('content.cluster', cluster);

    console.log("InstallerController:loadClusterInfo: loaded data ", cluster);
  },


  /**
   * Save all info about claster to model
   * @param stepController Step1WizardController
   */
  saveClusterInfo: function (stepController) {
    var cluster = stepController.get('content.cluster');
    var clusterStatus = {
      status: cluster.status,
      isCompleted: cluster.isCompleted
    }
    App.db.setClusterName(cluster.name);
    App.db.setClusterStatus(clusterStatus);

    console.log("InstallerController:saveClusterInfo: saved data ", cluster);

    //probably next line is extra work - need to check it
    this.set('content.cluster', cluster);
  },

  /**
   * Temporary function for wizardStep9, before back-end integration
   */
  setInfoForStep9: function () {
    App.db.setClusterStatus({status: 'pending', isCompleted: false});
    var hostInfo = App.db.getHosts();
    for (var index in hostInfo) {
      hostInfo[index].status = "pending";
      hostInfo[index].message = 'Information';
      hostInfo[index].progress = '0';
    }
    App.db.setHosts(hostInfo);
  },

  /**
   * Load all data for <code>Specify Host(install step2)</code> step
   * Data Example:
   * {
   *   hostNames: '',
   *   manualInstall: false,
   *   sshKey: '',
   *   passphrase: '',
   *   confirmPassphrase: '',
   *   localRepo: false,
   *   localRepoPath: ''
   * }
   */
  loadInstallOptions: function () {

    if (!this.content.hosts) {
      this.content.hosts = Em.Object.create();
    }

    //TODO : rewire it as model. or not :)
    var hostsInfo = Em.Object.create();

    hostsInfo.hostNames = App.db.getAllHostNames() || ''; //empty string if undefined

    //TODO : should we check installType for add host wizard????
    var installType = App.db.getInstallType();
    //false if installType not equals 'manual'
    hostsInfo.manualInstall = installType && installType.installType === 'manual' || false;

    var softRepo = App.db.getSoftRepo();
    if (softRepo && softRepo.repoType === 'local') {
      hostsInfo.localRepo = true;
      hostsInfo.localRepopath = softRepo.repoPath;
    } else {
      hostsInfo.localRepo = false;
      hostsInfo.localRepoPath = '';
    }

    hostsInfo.sshKey = 'random';
    hostsInfo.passphrase = '';
    hostsInfo.confirmPassphrase = '';

    this.set('content.hosts', hostsInfo);
    console.log("InstallerController:loadHosts: loaded data ", hostsInfo);
  },

  /**
   * Save data, which user filled, to main controller
   * @param stepController App.WizardStep2Controller
   */
  saveHosts: function (stepController) {
    //TODO: put data to content.hosts and only then save it)

    //App.db.setBootStatus(false);
    App.db.setAllHostNames(stepController.get('hostNames'));
    App.db.setHosts(stepController.getHostInfo());
    if (stepController.get('manualInstall') === false) {
      App.db.setInstallType({installType: 'ambari' });
    } else {
      App.db.setInstallType({installType: 'manual' });
    }
    if (stepController.get('localRepo') === false) {
      App.db.setSoftRepo({ 'repoType': 'remote', 'repoPath': null});
    } else {
      App.db.setSoftRepo({ 'repoType': 'local', 'repoPath': stepController.get('localRepoPath') });
    }
  },

  /**
   * Return hosts, which were add at <code>Specify Host(step2)</code> step
   * @paramm isNew whether return all hosts or only new ones
   */
  getHostList: function (isNew) {
    var hosts = [];
    var hostArray = App.db.getHosts()
    console.log('in instsllerController.getHostList: host names is ', hostArray);

    for (var i in hostArray) {
      var hostInfo = App.HostInfo.create({
        name: hostArray[i].name,
        bootStatus: hostArray[i].bootStatus
      });

      hosts.pushObject(hostInfo);
    }

    console.log('TRACE: pushing ' + hosts);
    return hosts;
  },

  /**
   * Remove host from model. Used at <code>Confirm hosts(step2)</code> step
   * @param hosts Array of hosts, which we want to delete
   */
  removeHosts: function (hosts) {
    //todo Replace this code with real logic
    App.db.removeHosts(hosts);
  },

  /**
   * Save data, which user filled, to main controller
   * @param stepController App.WizardStep3Controller
   */
  saveConfirmedHosts: function (stepController) {
    var hostInfo = {};
    stepController.get('content').forEach(function (_host) {
      hostInfo[_host.name] = {
        name: _host.name,
        cpu: _host.cpu,
        memory: _host.memory,
        bootStatus: _host.bootStatus
      };
    });
    console.log('installerController:saveConfirmedHosts: save hosts ', hostInfo);
    App.db.setHosts(hostInfo);
    this.set('content.hostsInfo', hostInfo);
  },

  /**
   * Load confirmed hosts.
   * Will be used at <code>Assign Masters(step5)</code> step
   */
  loadConfirmedHosts: function () {
    this.set('content.hostsInfo', App.db.getHosts());
  },

  /**
   * Save data after installation to main controller
   * @param stepController App.WizardStep9Controller
   */
  saveInstalledHosts: function (stepController) {
    var hosts = stepController.get('hosts');
    var hostInfo = App.db.getHosts();

    for (var index in hostInfo) {
      hostInfo[index].status = "pending";
      var host = hosts.findProperty('name', hostInfo[index].name);
      if (host) {
        hostInfo[index].status = host.status;
        hostInfo[index].message = host.message;
        hostInfo[index].progress = host.progress;
      }
    }
    App.db.setHosts(hostInfo);
    console.log('installerController:saveInstalledHosts: save hosts ', hostInfo);
  },

  /**
   * Remove all data for hosts
   */
  clearHosts: function () {
    var hosts = this.get('content').get('hosts');
    if (hosts) {
      hosts.hostNames = '';
      hosts.manualInstall = false;
      hosts.localRepo = '';
      hosts.localRepopath = '';
      hosts.sshKey = '';
      hosts.passphrase = '';
      hosts.confirmPassphrase = '';
    }
  },

  /**
   * Load services data. Will be used at <code>Select services(step4)</code> step
   */
  loadServices: function () {
    var servicesInfo = App.db.getService();
    servicesInfo.forEach(function (item, index) {
      servicesInfo[index] = Em.Object.create(item);
    });
    this.set('content.services', servicesInfo);
    console.log('installerController.loadServices: loaded data ', servicesInfo);
    console.log('selected services ', servicesInfo.filterProperty('isSelected', true).mapProperty('serviceName'));
  },

  /**
   * Save data to model
   * @param stepController App.WizardStep4Controller
   */
  saveServices: function (stepController) {
    var serviceNames = [];
    // we can also do it without stepController since all data,
    // changed at page, automatically changes in model(this.content.services)
    App.db.setService(stepController.get('content'));
    stepController.filterProperty('isSelected', true).forEach(function (item) {
      serviceNames.push(item.serviceName);
    });
    App.db.setSelectedServiceNames(serviceNames);
    console.log('installerController.saveServices: saved data ', serviceNames);
  },

  /**
   * Save Master Component Hosts data to Main Controller
   * @param stepController App.WizardStep5Controller
   */
  saveMasterComponentHosts: function (stepController) {
    var obj = stepController.get('selectedServicesMasters');
    var masterComponentHosts = [];
    obj.forEach(function (_component) {
      masterComponentHosts.push({
        component: _component.component_name,
        hostName: _component.selectedHost
      });
    });

    console.log("installerController.saveComponentHosts: saved hosts ", masterComponentHosts);
    App.db.setMasterComponentHosts(masterComponentHosts);
    this.set('content.masterComponentHosts', masterComponentHosts);

    var hosts = masterComponentHosts.mapProperty('hostName').uniq();
    var hostsMasterServicesMapping = [];
    hosts.forEach(function (_host) {
      var componentsOnHost = masterComponentHosts.filterProperty('hostName', _host).mapProperty('component');
      hostsMasterServicesMapping.push({
        hostname: _host,
        components: componentsOnHost
      });
    }, this);
    console.log("installerController.setHostToMasterComponent: saved hosts ", hostsMasterServicesMapping);
    App.db.setHostToMasterComponent(hostsMasterServicesMapping);
    this.set('content.hostToMasterComponent', hostsMasterServicesMapping);
  },

  /**
   * Load master component hosts data for using in required step controllers
   */
  loadMasterComponentHosts: function () {
    var masterComponentHosts = App.db.getMasterComponentHosts();
    this.set("content.masterComponentHosts", masterComponentHosts);
    console.log("InstallerController.loadMasterComponentHosts: loaded hosts ", masterComponentHosts);

    var hostsMasterServicesMapping = App.db.getHostToMasterComponent();
    this.set("content.hostToMasterComponent", hostsMasterServicesMapping);
    console.log("InstallerController.loadHostToMasterComponent: loaded hosts ", hostsMasterServicesMapping);
  },

  /**
   * Save slaveHostComponents to main controller
   * @param stepController
   */
  saveSlaveComponentHosts: function (stepController) {

    var hosts = stepController.get('hosts');
    var isMrSelected = stepController.get('isMrSelected');
    var isHbSelected = stepController.get('isHbSelected');

    App.db.setHostSlaveComponents(hosts);
    this.set('content.hostSlaveComponents', hosts);

    var dataNodeHosts = [];
    var taskTrackerHosts = [];
    var regionServerHosts = [];
    var clientHosts = [];

    hosts.forEach(function (host) {
      if (host.get('isDataNode')) {
        dataNodeHosts.push({
          hostname: host.hostname,
          group: 'Default'
        });
      }
      if (isMrSelected && host.get('isTaskTracker')) {
        taskTrackerHosts.push({
          hostname: host.hostname,
          group: 'Default'
        });
      }
      if (isHbSelected && host.get('isRegionServer')) {
        regionServerHosts.push({
          hostname: host.hostname,
          group: 'Default'
        });
      }
      if (host.get('isClient')) {
        clientHosts.pushObject({
          hostname: host.hostname,
          group: 'Default'
        });
      }
    }, this);

    var slaveComponentHosts = [];
    slaveComponentHosts.push({
      componentName: 'DATANODE',
      displayName: 'DataNode',
      hosts: dataNodeHosts
    });
    if (isMrSelected) {
      slaveComponentHosts.push({
        componentName: 'TASKTRACKER',
        displayName: 'TaskTracker',
        hosts: taskTrackerHosts
      });
    }
    if (isHbSelected) {
      slaveComponentHosts.push({
        componentName: 'HBASE_REGIONSERVER',
        displayName: 'RegionServer',
        hosts: regionServerHosts
      });
    }
    slaveComponentHosts.pushObject({
      componentName: 'CLIENT',
      displayName: 'client',
      hosts: clientHosts
    });

    App.db.setSlaveComponentHosts(slaveComponentHosts);
    this.set('content.slaveComponentHosts', slaveComponentHosts);
  },

  /**
   * Load master component hosts data for using in required step controllers
   */
  loadSlaveComponentHosts: function () {
    var slaveComponentHosts = App.db.getSlaveComponentHosts();
    this.set("content.slaveComponentHosts", slaveComponentHosts);
    console.log("InstallerController.loadSlaveComponentHosts: loaded hosts ", slaveComponentHosts);

    var hostSlaveComponents = App.db.getHostSlaveComponents();
    this.set('content.hostSlaveComponents', hostSlaveComponents);
    console.log("InstallerController.loadSlaveComponentHosts: loaded hosts ", hostSlaveComponents);
  },

  /**
   * Save config properties
   * @param stepController Step7WizardController
   */
  saveServiceConfigProperties: function (stepController) {
    var serviceConfigProperties = [];
    stepController.get('stepConfigs').forEach(function (_content) {
      _content.get('configs').forEach(function (_configProperties) {
        var configProperty = {
          name: _configProperties.get('name'),
          value: _configProperties.get('value')
        };
        serviceConfigProperties.push(configProperty);
      }, this);

    }, this);

    App.db.setServiceConfigProperties(serviceConfigProperties);
    this.set('content.serviceConfigProperties', serviceConfigProperties);
  },

  /**
   * Load serviceConfigProperties to model
   */
  loadServiceConfigProperties: function () {
    var serviceConfigProperties = App.db.getServiceConfigProperties();
    this.set('content.serviceConfigProperties', serviceConfigProperties);
    console.log("InstallerController.loadServiceConfigProperties: loaded config ", serviceConfigProperties);
  },

  /**
   * Load information about hosts with clients components
   */
  loadClients: function(){
    var clients = App.db.getClientsForSelectedServices();
    this.set('content.clients', clients);
    console.log("InstallerController.loadClients: loaded list ", clients);
  },

  /**
   * Generate clients list for selected services and save it to model
   * @param stepController step4WizardController
   */
  saveClients: function(stepController){
    var clients = [];
    var serviceComponents = require('data/service_components');

    stepController.get('content').filterProperty('isSelected',true).forEach(function (_service) {
      var client = serviceComponents.filterProperty('service_name', _service.serviceName).findProperty('isClient', true);
      if (client) {
        clients.pushObject({
          component_name: client.component_name,
          display_name: client.display_name
        });
      }
    }, this);

    App.db.setClientsForSelectedServices(clients);
    this.set('content.clients', clients);
    console.log("InstallerController.saveClients: saved list ", clients);
  },

  /**
   * Load HostToMasterComponent array
   */
  loadHostToMasterComponent: function(){
    var list = App.db.getHostToMasterComponent();
    this.set('content.hostToMasterComponent', list);
    console.log("AddHostController.loadHostToMasterComponent: loaded list ", list);
  },

  /**
   * List of statuses, what data is currently loaded
   */
  isStepLoaded: {},

  /**
   * Call specified function only once
   */
  callLoadFuncOnce: function (name) {
    if (!this.isStepLoaded[name]) {
      this[name]();
      this.isStepLoaded[name] = true;
    }
  },

  /**
   * Load data for all steps until <code>current step</code>
   */
  loadAllPriorSteps: function () {
    var step = this.get('currentStep');
    switch (step) {
      case '9':
          //need to call it every time since we preload data in setInfoForStep9
        this.loadClusterInfo();
      case '8':
        this.loadClusterInfo();
      case '7':
        this.callLoadFuncOnce('loadServiceConfigProperties');
      case '6':
        this.callLoadFuncOnce('loadMasterComponentHosts');
        this.callLoadFuncOnce('loadSlaveComponentHosts');
        this.callLoadFuncOnce('loadClients');
        this.callLoadFuncOnce('loadHostToMasterComponent');
      case '5':
        this.callLoadFuncOnce('loadConfirmedHosts');
      case '4':
        this.callLoadFuncOnce('loadServices');
      case '3':
      case '2':
        this.callLoadFuncOnce('loadInstallOptions');
      case '1':
        this.callLoadFuncOnce('loadClusterInfo');
    }
  }

});