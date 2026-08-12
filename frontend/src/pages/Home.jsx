import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import InterviewCard from "../components/InterviewCard";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get("/feedback");
        setInterviews(res.data.feedbacks || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setInterviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {user?.name && (
        <div className="mx-16 mt-8 text-center text-4xl font-bold text-white max-sm:mx-4">
          Welcome, {user.name.split(" ")[0]} 👋
        </div>
      )}

      <div className="flex flex-row bg-gradient-to-b from-[#171532] to-[#08090D] rounded-3xl mx-16 my-10 items-center justify-between max-sm:mx-4">
        <div className="flex gap-10 mt-10 mb-10 max-sm:mt-0 max-sm:mb-3 max-sm:ml-2 max-sm:mr-2">
          <section className="flex flex-col gap-4 blue-gradient-dark rounded-3xl px-16 pt-6 pb-6 items-start max-w-[1400px] px-10-[1400]:max-w-full max-sm:px-3">
            <h1 className="text-3xl font-semibold max-lg:ml-0 max-lg:mt-3">
              Prepare for real interviews with your AI buddy!
            </h1>
            <p className="text-lg text-light-100 max-lm:ml-0">
              Practice real interview questions and receive instant feedback to improve.
            </p>
            <Button
              asChild
              className="mt-2 w-fit !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !font-bold px-5 cursor-pointer min-h-10 max-sm:w-full max-sm:ml-0"
            >
              <Link to="/interview">Start Interview</Link>
            </Button>
          </section>

          <section className="flex justify-center items-center max-[1400px]:hidden">
            <img
              src="/robot.png"
              alt="Robot"
              width={400}
              height={400}
              className="max-sm:hidden flex justify-center items-center"
            />
          </section>
        </div>
      </div>

      <div className="mx-16 my-10 max-sm:mx-4">
        <section className="flex flex-col gap-6 mt-8">
          <h2 className="text-3xl font-semibold">Your Interviews</h2>

          {loading ? (
            <div className="flex justify-center items-center h-24">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch mt-4">
              {interviews.length === 0 ? (
                <p className="text-light-100">You haven't taken any interviews yet.</p>
              ) : (
                interviews.map((interview) => (
                  <InterviewCard {...interview} key={interview._id} />
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
