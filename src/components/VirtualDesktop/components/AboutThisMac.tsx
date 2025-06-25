import { motion } from 'framer-motion';

interface AboutThisMacProps {
  onClose: () => void;
}

export function AboutThisMac({ onClose }: AboutThisMacProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[10000]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">About This Device</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
          >
            <span className="text-white text-sm">×</span>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Askie Character */}
          <div className="flex justify-center">
            <img 
              src="/icons/Askie.svg" 
              alt="Askie - Digital Assistant" 
              className="w-32 h-32"
            />
          </div>

          {/* System Info */}
          <div className="space-y-3">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Askie OS</h3>
              <p className="text-gray-600">Version 14.2.1 (Digital Garden Edition)</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Chip:</span>
                <span className="font-medium">Eurys (Creative Core)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Memory:</span>
                <span className="font-medium">18 GB Unified Memory</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Storage:</span>
                <span className="font-medium">512 GB SSD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Serial Number:</span>
                <span className="font-medium">ASKIECRTV2024</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-4">
            <p className="text-xs text-gray-500 text-center">
              Powered by imagination and creativity.<br/>
              Digital Garden OS - Where ideas grow into reality.
            </p>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}