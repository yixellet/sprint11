'use strict';

class UserInfo {
  constructor(nameField, jobField, avatarContainer) {
    this.nameField = nameField;
    this.jobField = jobField;
    this.avatarContainer = avatarContainer;
    this.id = null;
    this.name = this.nameField.textContent;
    this.job = this.jobField.textContent;
  }

  setUserInfo(newId, newName, newJob, avatarUrl) {
    this.id = newId;
    this.name = newName;
    this.job = newJob;
    this.avatarContainer.style.backgroundImage = `url(${avatarUrl})`;
  }

  updateUserInfo() {
    this.nameField.textContent = this.name;
    this.jobField.textContent = this.job;
  }

  getUserInfo() {
    return {name: this.name, info: this.job};
  }
}