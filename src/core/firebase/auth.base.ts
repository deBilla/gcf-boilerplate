import admin from "firebase-admin";

export class FirebaseBaseAuth {
  static async setUserRole(email: string, role: string) {
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      const uid = userRecord.uid;
      await admin.auth().setCustomUserClaims(uid, {role});
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  static async getUserRole(email: string) {
    try {
      const user = await admin.auth().getUserByEmail(email);
      return user.customClaims?.role;
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  static async getUserRoleById(uid: string) {
    try {
      const user = await admin.auth().getUser(uid);
      return user.customClaims?.role;
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  static async verifyToken(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
}
