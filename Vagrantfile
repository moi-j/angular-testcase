# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = 'generic/ubuntu1710'

  config.vm.network :private_network, ip: "10.10.10.10"
  # backend
  config.vm.network :forwarded_port, guest: 8000, host: 8000
  # frontend
  config.vm.network :forwarded_port, guest: 8001, host: 8001
  config.ssh.forward_agent = true
  config.vm.hostname = "angular-test"

  # /etc/hosts entries
  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.aliases = %w(angular-test.rh-dev.eu)

  # folder synchronisation
  config.vm.synced_folder ".", "/vagrant", type: "nfs"
  config.vm.synced_folder 'vagrant/salt/roots', '/srv'

  # configuration
  config.vm.provision :salt do |salt|
    salt.masterless = true
    salt.minion_config = "vagrant/salt/minion.conf"
    salt.run_highstate = true
    salt.verbose = true
    salt.bootstrap_options = "-c /tmp/ -P"
  end
end