import { useEffect } from "react";
import { get, push, ref } from "firebase/database";
import { database } from "../firebase";
import { denormalize } from "./collection";
import { migrations } from "./migrations";

const migrationsRef = ref(database, "migrations");

export const useMigrator = () => {
    const runMigrations = async () => {
        const processedMigrations = denormalize<string>((await get(migrationsRef))?.val()).map((row) => row.data);
        const migrationsToRun = migrations.filter((migration) => !processedMigrations.includes(migration.name));

        for (const migration of migrationsToRun) {
            await new migration().up();
            await push(migrationsRef, migration.name);
        }
    };

    useEffect(() => {
        runMigrations().then(() => console.log("Migrations completed")).catch(console.error);
    }, []);
};