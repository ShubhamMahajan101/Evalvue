/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  serializer: {
    getModulesRunBeforeMainModule: () => [
      require.resolve('react-native/Libraries/Core/InitializeCore'),
    ],
    getPolyfills: () => require('react-native/rn-get-polyfills')(),
  },
  // Add this line
  sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
};


// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
//   serializer: {
//     getModulesRunBeforeMainModule: () => [
//       require.resolve('react-native/Libraries/Core/InitializeCore'),
//     ],
//     getPolyfills: () => require('react-native/rn-get-polyfills')(),
//   },
//   // Add this line
//   sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
// };

