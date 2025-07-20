import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Leaf, Plus, Camera, FileText, Pill, Cloud, MessageCircle, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

const HomeScreen = ({ onNavigate }) => {
  const { state } = useApp();

  const selectedCrops = state.selectedCrops.slice(0, 5); // Show first 5 crops

  const handleTakePicture = () => {
    onNavigate('cropHealth');
  };

  const handleVoiceInput = () => {
    onNavigate('voiceInput');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Leaf size={24} color="#22C55E" />
          <Text style={styles.headerTitle}>{getTranslation(state.selectedLanguage, 'plantix')}</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <MoreHorizontal size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User ID Display */}
        <View style={styles.userIdContainer}>
          <Text style={styles.userIdText}>
            {getTranslation(state.selectedLanguage, 'userId')}: {state.user?.uid?.substring(0, 8) || 'Anonymous'}
          </Text>
        </View>

        {/* Crops Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getTranslation(state.selectedLanguage, 'yourCrops')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cropsScroll}>
            {selectedCrops.map((cropId, index) => (
              <View key={cropId} style={styles.cropItem}>
                <View style={styles.cropIcon}>
                  <Text style={styles.cropEmoji}>🌱</Text>
                </View>
                <Text style={styles.cropName}>{cropId}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.addCropButton}>
              <Plus size={24} color="#22C55E" />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Weather Card */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <Text style={styles.locationText}>Dimow, 20 Jul</Text>
            <Text style={styles.weatherCondition}>Foggy</Text>
          </View>
          <View style={styles.weatherContent}>
            <View style={styles.temperatureSection}>
              <Text style={styles.currentTemp}>34°C</Text>
              <Text style={styles.tempRange}>25°C / 33°C</Text>
            </View>
            <Cloud size={48} color="#6B7280" />
          </View>
          <View style={styles.sprayingAlert}>
            <Text style={styles.sprayingText}>{getTranslation(state.selectedLanguage, 'sprayingUnfavorable')}</Text>
          </View>
        </View>

        {/* Heal Your Crop Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getTranslation(state.selectedLanguage, 'healYourCrop')}</Text>
          <View style={styles.healFlow}>
            <View style={styles.flowStep}>
              <Camera size={32} color="#22C55E" />
              <Text style={styles.flowText}>{getTranslation(state.selectedLanguage, 'takePicture')}</Text>
            </View>
            <View style={styles.flowArrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
            <View style={styles.flowStep}>
              <FileText size={32} color="#3B82F6" />
              <Text style={styles.flowText}>{getTranslation(state.selectedLanguage, 'seeDiagnosis')}</Text>
            </View>
            <View style={styles.flowArrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
            <View style={styles.flowStep}>
              <Pill size={32} color="#EF4444" />
              <Text style={styles.flowText}>{getTranslation(state.selectedLanguage, 'getMedicine')}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.takePictureButton} onPress={handleTakePicture}>
            <Camera size={20} color="#FFFFFF" />
            <Text style={styles.takePictureText}>{getTranslation(state.selectedLanguage, 'takePicture')}</Text>
          </TouchableOpacity>
        </View>

        {/* Manage Fields Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getTranslation(state.selectedLanguage, 'manageFields')}</Text>
          <View style={styles.fieldCard}>
            <Text style={styles.fieldTitle}>{getTranslation(state.selectedLanguage, 'startPrecisionFarming')}</Text>
            <Text style={styles.fieldDescription}>
              {getTranslation(state.selectedLanguage, 'precisionFarmingDesc')}
            </Text>
            <View style={styles.fieldIllustration}>
              <Text style={styles.fieldEmoji}>🚜</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleVoiceInput}>
        <MessageCircle size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  menuButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userIdContainer: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  userIdText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  cropsScroll: {
    flexDirection: 'row',
  },
  cropItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  cropIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cropEmoji: {
    fontSize: 24,
  },
  cropName: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
  },
  addCropButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#22C55E',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  weatherCondition: {
    fontSize: 14,
    color: '#6B7280',
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  temperatureSection: {
    flex: 1,
  },
  currentTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  tempRange: {
    fontSize: 14,
    color: '#6B7280',
  },
  sprayingAlert: {
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: 8,
  },
  sprayingText: {
    fontSize: 14,
    color: '#92400E',
    textAlign: 'center',
  },
  healFlow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  flowStep: {
    alignItems: 'center',
    flex: 1,
  },
  flowText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  flowArrow: {
    paddingHorizontal: 10,
  },
  arrowText: {
    fontSize: 20,
    color: '#D1D5DB',
  },
  takePictureButton: {
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
  },
  takePictureText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  fieldCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  fieldDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  fieldIllustration: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldEmoji: {
    fontSize: 40,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default HomeScreen;