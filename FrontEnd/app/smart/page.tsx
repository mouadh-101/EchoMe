import { BottomNavigation } from "@/components/bottom-navigation"
import { DesktopLayout } from "@/components/desktop-layout"
import { Brain, TrendingUp, Target, Lightbulb } from "lucide-react"

export default function SmartPage() {
  const SmartContent = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="bg-[#1A1A1A] rounded-full p-8 w-fit mx-auto mb-8">
          <Brain className="h-16 w-16 lg:h-20 lg:w-20 text-[#1FB2A6]" />
        </div>

        <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Smart Insights</h1>
        <p className="text-[#F4EBDC]/70 text-lg mb-8 max-w-md mx-auto">
          As you record more echoes, AI will analyze patterns and provide personalized insights about your thoughts and
          habits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-[#1A1A1A] border border-[#333333] rounded-2xl p-6">
            <div className="bg-[#1FB2A6]/20 p-4 rounded-full w-fit mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-[#1FB2A6]" />
            </div>
            <h3 className="font-medium text-lg mb-2">Trend Analysis</h3>
            <p className="text-[#F4EBDC]/70 text-sm">Track patterns in your thoughts and ideas over time</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#333333] rounded-2xl p-6">
            <div className="bg-[#1FB2A6]/20 p-4 rounded-full w-fit mx-auto mb-4">
              <Target className="h-8 w-8 text-[#1FB2A6]" />
            </div>
            <h3 className="font-medium text-lg mb-2">Goal Tracking</h3>
            <p className="text-[#F4EBDC]/70 text-sm">Monitor progress on your personal and professional goals</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#333333] rounded-2xl p-6">
            <div className="bg-[#1FB2A6]/20 p-4 rounded-full w-fit mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-[#1FB2A6]" />
            </div>
            <h3 className="font-medium text-lg mb-2">Smart Suggestions</h3>
            <p className="text-[#F4EBDC]/70 text-sm">Get AI-powered recommendations based on your content</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <DesktopLayout activeTab="smart">
          <SmartContent />
        </DesktopLayout>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <main className="flex min-h-screen flex-col bg-[#0E0E0E] text-[#F4EBDC]">
          <div className="flex-1 container max-w-md mx-auto px-4 pb-20">
            <SmartContent />
          </div>
          <BottomNavigation activeTab="smart" />
        </main>
      </div>
    </>
  )
}
