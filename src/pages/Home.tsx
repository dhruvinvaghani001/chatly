import { Chat } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, MessageCircle, Shield, Users, Zap } from "lucide-react";
import React from "react";

const Home = () => {
  return (
    <>
      <main className="flex-1">
        <section className="relative pt-20 pb-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"></div>

          <div className="relative container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <h1 className="text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  Connect with anyone, anywhere in real-time
                </h1>
                <p className="text-xl text-muted-foreground">
                  Experience seamless communication with our modern chat
                  platform. Share messages, files, and create meaningful
                  connections.
                </p>
                <div className="space-x-4">
                  <a href="/dashboard">
                    <Button
                      size="lg"
                      className="px-8 bg-indigo-600 hover:bg-indigo-500"
                    >
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>

              <div className="lg:w-1/2">
                {/* <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-20"></div>
                  <div className="relative bg-card rounded-lg border shadow-2xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                          <span className="text-white font-bold">JD</span>
                        </div>
                        <div className="flex-1">
                          <p className="bg-muted p-3 rounded-lg inline-block">
                            Hey! How's the new project coming along? 👋
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 justify-end">
                        <div className="flex-1 text-right">
                          <p className="bg-indigo-600 text-white p-3 rounded-lg inline-block">
                            Going great! Just finished the main features 🚀
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold">ME</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <img src={Chat} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Why Choose Our Platform?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-card border">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center">
                      <Users className="h-6 w-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-indigo-400">
                      Group Chats
                    </h3>
                    <p className="text-muted-foreground">
                      Create groups for teams, friends, or communities
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-indigo-400">
                      Secure
                    </h3>
                    <p className="text-muted-foreground">
                      End-to-end encryption for your privacy
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-indigo-400">
                      Fast
                    </h3>
                    <p className="text-muted-foreground">
                      Real-time messaging with instant delivery
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 to-background"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Ready to start chatting?
            </h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Join millions of users already connecting on our platform
            </p>
            <a href="/signup">
              <Button
                size="lg"
                className="px-8 bg-indigo-600 hover:bg-indigo-500"
              >
                Create Free Account
              </Button>
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
