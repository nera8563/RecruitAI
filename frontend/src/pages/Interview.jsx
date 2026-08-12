import Agent from "../components/Agent";
import { useAuth } from "../context/AuthContext";

const Interview = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-scree mx-17 max-lg:mx-4 max-sm:mx-4">
      <h3 className="text-center text-primary-100 mt-5 text-3xl font-semibold mb-8">
       RecruitAI . . .
      </h3>
      <Agent userName={user?.name} />
    </div>
  );
};

export default Interview;
