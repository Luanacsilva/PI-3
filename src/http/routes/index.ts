import { Router } from "express";
import { class_routes } from "./class_routes";
import { subject_routes } from "./subject_routes";
import { user_routes } from "./user_routes";
import { auth_routes } from "./auth_routes";
import { grade_routes } from "./grade_routes";
import { announcement_routes } from "./announcement_routes";

const router = Router();

router.use(auth_routes);
router.use(class_routes);
router.use(subject_routes);
router.use(user_routes);
router.use(grade_routes);
router.use(announcement_routes);

export { router as api_routes };