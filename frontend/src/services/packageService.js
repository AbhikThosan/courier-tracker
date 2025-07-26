import apiClient from '../utils/apiClient';

class PackageService {
  // Get all packages
  async getPackages() {
    return apiClient.get('/packages');
  }

  // Get package by ID
  async getPackageById(packageId) {
    return apiClient.get(`/packages/${packageId}`);
  }

  // Create new package
  async createPackage(packageData) {
    return apiClient.post('/packages', packageData);
  }

  // Update package status
  async updatePackageStatus(packageId, statusData) {
    return apiClient.patch(`/packages/${packageId}/status`, statusData);
  }

  // Get package updates
  async getPackageUpdates(packageId) {
    return apiClient.get(`/packages/${packageId}/updates`);
  }

  // Submit package update (for couriers)
  async submitPackageUpdate(updateData) {
    return apiClient.post('/packages/updates', updateData);
  }

  // Get packages by status
  async getPackagesByStatus(status) {
    return apiClient.get(`/packages?status=${status}`);
  }

  // Assign package to courier
  async assignPackageToCourier(packageId, courierId) {
    return apiClient.patch(`/packages/${packageId}/assign`, { courier_id: courierId });
  }

  // Get packages assigned to courier
  async getCourierPackages(courierId) {
    return apiClient.get(`/packages?assigned_courier=${courierId}`);
  }
}

export default new PackageService(); 