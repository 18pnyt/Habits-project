import 'dotenv/config';
import db, { User, Goal, Habit } from 'dat';
import addGoal from './addGoal.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Limpiar datos de prueba existentes
            await User.deleteMany({ email: 'test@example.com' });
            await Goal.deleteMany({ name: 'Meta de ejercicio' });
            await Habit.deleteMany({ name: 'Ejercicio diario' });
            
            // Crear usuario de prueba
            const user = await User.create({
                name: 'Usuario Test',
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
                role: 'regular'
            });
            
            // Crear hábito de prueba
            const habit = await Habit.create({
                user: user._id,
                name: 'Ejercicio diario',
                category: 'actividad física',
                emoji: '🏋️'
            });
            
            const goalData = {
                name: 'Meta de ejercicio',
                period: 'monthly',
                objective: 30,
                targetDays: 30
            };
            
            const goal = await addGoal(user._id.toString(), habit._id.toString(), goalData);
            console.log('✅ Meta creada exitosamente:', goal.name);
        } catch (error) {
            console.error('❌ Error al crear meta:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()); 