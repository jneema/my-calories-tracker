// --- Styles ---
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  blurContainer: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 24,
  },
  iconContainer: {
    width: 96,
    height: 96,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    color: "white",
    fontSize: 38,
    fontWeight: "300",
    textAlign: "center",
    letterSpacing: -1,
  },
  description: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 320,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 32,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  activeDot: {
    backgroundColor: "white",
  },
  nextButton: {
    position: "absolute",
    bottom: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 32,
  },
  nextText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginRight: 8,
  },
});

export default styles;
